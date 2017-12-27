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
	stage.addChild(draw.drawSquare(hCenter - GRID_SIZE + 19,vCenter - GRID_SIZE+19,GRID_SIZE-38,GRID_SIZE-38,"Black"));
	stage.addChild(draw.drawSquare(hCenter - GRID_SIZE + 20,vCenter - GRID_SIZE+20,GRID_SIZE-40,GRID_SIZE-40,"Purple"));
	
	

	createjs.Ticker.setFPS(FRAME_RATE);	
	createjs.Ticker.addEventListener("tick", tick);	
	
	sys.Rest('users', true).then(function(result) {
		user = JSON.parse(result);
		sys.Rest('map').then(function(result) {
			map = map.readTerrain(result);
			draw.fillGrid(map, user, container, w, h);
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
	vCenter = h/2;
	hCenter = w/2;
}






