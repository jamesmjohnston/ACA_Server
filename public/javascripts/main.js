var keyState = {};
var squares = {};
var container, user, map, users = {};

window.addEventListener('keydown',function(e){
    keyState[e.keyCode || e.which] = true;
},true);
window.addEventListener('keyup',function(e){
    delete keyState[e.keyCode];
},true);

function handleComplete() {
	moving = false;
}

function init() {
	moving = false;	
	resizeCanvas();
	stage = new createjs.Stage("mainCanvas");
	container = new createjs.Container();
    grid = new Grid();
	stage.addChild(container);
	stage.addChild(draw.drawUser(0, 0, "Purple"));
	createjs.Ticker.setFPS(FRAME_RATE);	
	createjs.Ticker.addEventListener("tick", tick);	
	sys.Rest('users', true).then(function(result) {
		user = result;
		sys.Rest('map').then(function(result) {
			map = new Grid(result);
			container.x -= GRID_SIZE * user.x;
			container.y += GRID_SIZE * user.y;
			draw.fillGrid(map, grid, container, w, h);
			sys.LongPoll(true);
			stage.update();
		});
	}, function(err) {
		console.log('map failed');
	});
}

function tick(event) {
	keys.handleKeys(container);
    stage.update();
}

function resizeCanvas() {
    canvas = document.getElementById("mainCanvas");
	canvas.height = h = window.innerHeight;
	canvas.width = w = window.innerWidth;
	vCenter = h/2;
	hCenter = w/2;
}






