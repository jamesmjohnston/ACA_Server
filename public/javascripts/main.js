var keyState = {};
var squares = {};
var stage = {};
var container, user, users = {};

var username = prompt("Enter username");

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
	resizeCanvas();
	moving = false;
	var stage = new createjs.Stage("mainCanvas");
    var stDraw = new Draw(stage);
	stDraw.drawUser(0, 0, "Purple");
	createjs.Ticker.setFPS(FRAME_RATE);	
	createjs.Ticker.addEventListener("tick", tick());
	
	sys.Rest('users', true).then(function(result) {
		user = result;
		sys.Rest('map').then(function(result) {
			var map = new Grid(result);
			var container = new createjs.Container();
			stage.addChild(container);
			var ctDraw = new Draw(container, map, new Grid());
			container.x -= GRID_SIZE * user.x;
			container.y += GRID_SIZE * user.y;
			
			ctDraw.fillGrid();
			sys.LongPoll(true, ctDraw);
			stage.update();
		});
	}, function(err) {
		console.log('map failed');
	});
}

function tick() {
    keys.handleKeys(stage);
    stage.update();
}

function resizeCanvas() {
    canvas = document.getElementById("mainCanvas");
	canvas.height = h = window.innerHeight;
	canvas.width = w = window.innerWidth;
	vCenter = h/2;
	hCenter = w/2;
}






