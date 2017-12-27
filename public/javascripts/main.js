var keyState = {};
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
	stage.addChild(container);
	stage.addChild(draw.drawSquare(4*GRID_SIZE,2*GRID_SIZE,GRID_SIZE,GRID_SIZE,"Purple"));
	
	draw.generateGrid(container, w, h);

	createjs.Ticker.setFPS(FRAME_RATE);	
	createjs.Ticker.addEventListener("tick", tick);	
	
	sys.Rest('map').then(function(result) {
		map = map.readTerrain(result);
		draw.fillGrid(map, container, w, h);
		sys.Rest('users', true).then(function(result) {
			user = JSON.parse(result);
			container.x -= GRID_SIZE * (50 - user.x);
			container.y -= GRID_SIZE * (50 - user.y);
			stage.update;
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
}






