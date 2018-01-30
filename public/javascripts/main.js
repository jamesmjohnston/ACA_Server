var keyState = {};
var squares = {};
var stage = {};
var container, user, ctDraw, users = {};
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

function tick() {
    keys.handleKeys(ctDraw);
    stage.update();
}

function init() {
	resizeCanvas();
	moving = false;
	stage = new createjs.Stage("mainCanvas");
        var stDraw = new Draw(stage);
	
	sys.Rest('users', true).then(function(result) {
	    user = result;
	    sys.Rest('map').then(function(result) {
		 var map = new Grid(result);
		var container = new createjs.Container();
		stage.addChild(container);
		ctDraw = new Draw(container, map, new Grid());
		container.x -= GRID_SIZE * user.x;
		container.y += GRID_SIZE * user.y;

		ctDraw.fillGrid();
	        stage.addChild(stDraw.drawUser(0,0,"Purple"));
		sys.LongPoll(true, ctDraw);
	        createjs.Ticker.setFPS(FRAME_RATE);	
	        createjs.Ticker.addEventListener("tick", tick);
	    });
	}, function(err) {
 	    console.log('map failed');
	});
}

function resizeCanvas() {
    canvas = document.getElementById("mainCanvas");
    canvas.height = h = window.innerHeight;
    canvas.width = w = window.innerWidth;
    vCenter = h/2;
    hCenter = w/2;
}






