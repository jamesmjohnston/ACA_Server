var keyState = {};
var squares = {};
var stage = {};
var container, user, ctDraw, users = {};
var container, users = {};


function handleComplete() {
    moving = false;
}

function tick() {
    keys.handleKeys(ctDraw);
    stage.update();
}

function init() {
    addWindowListeners();
    var username = prompt("Enter username");
    username = username ? username :  "tempuser";
   
    resizeCanvas();
    moving = false;
    stage = new createjs.Stage("mainCanvas");
    sys.username = username;
    // Fetch userlist
    sys.Rest('users').then(function(result) {
        user = result;
        user.username = username;
        sys.Rest('map').then(function(result) {
            var container = new createjs.Container();
	    stage.addChild(container);
	    ctDraw = new Draw(container, new Grid(result), new Grid(), user);
	    initGrid(ctDraw, container);
	    sys.LongPoll(true, ctDraw);
	});
    }, function(err) {
         console.log('map read failed');
    });
}

function initGrid(draw, container) {
    // Adjust grid offset
    container.x -= GRID_SIZE * user.x;
    container.y += GRID_SIZE * user.y;

    draw.fillGrid();

    // Draw User
    stage.addChild(draw.drawUser(0,0,"Purple"));

    // Start Tick
    createjs.Ticker.setFPS(FRAME_RATE);	
    createjs.Ticker.addEventListener("tick", tick);
}

function resizeCanvas() {
    canvas = document.getElementById("mainCanvas");
    canvas.height = h = window.innerHeight;
    canvas.width = w = window.innerWidth;
    vCenter = h/2;
    hCenter = w/2;
}

function addWindowListeners() {
    window.addEventListener('keydown',function(e){
        keyState[e.keyCode || e.which] = true;
    },true);
    window.addEventListener('keyup',function(e){
        delete keyState[e.keyCode];
    },true);
}
