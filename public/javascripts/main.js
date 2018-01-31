var keyState = {};
var squares = {};
var ctDraw, users = {};

function tick() {
    ctDraw.handleKeys();
    ctDraw.stage.update();
}

function init() {
    addWindowListeners();
    resizeCanvas();

    sys.username = prompt("Enter username");
    sys.username = sys.username ? sys.username :  "tempuser";
   
    var stage = new createjs.Stage("mainCanvas");
    // Fetch userlist
    sys.Rest('users').then(function(result) {
        var user = result;
        user.username = sys.username;
        sys.Rest('map').then(function(result) {
            var container = new createjs.Container();
	        stage.addChild(container);
	        ctDraw = new Draw(container, stage, new Grid(result), new Grid(), user, users);
	        initGrid(ctDraw, container);

            // Init Polling
	        sys.LongPoll(ctDraw);
	    });
    }, function(err) {
         console.log('map read failed');
    });
}

function initGrid(draw, container) {
    // Adjust grid offset
    container.x -= GRID_SIZE * draw.user.x;
    container.y += GRID_SIZE * draw.user.y;

    draw.fillGrid();

    // Draw User
    draw.stage.addChild(draw.drawUser(0,0,"Purple", sys.username));

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
    window.onunload = sys.logout;
}
