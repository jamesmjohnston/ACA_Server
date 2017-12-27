var draw = {};

draw.fillGrid = function(map, user, stage, width, height) {
	var colors = ["#2E7D32", "#DAF7A6", "#515A5A", "#21618C"];
	
	container.x -= GRID_SIZE * (50 + user.x);
	container.y -= GRID_SIZE * (50 - user.y);
    for (var x = 50+user.x-10; x < 50+user.x+10; x++) {
		for (var y = 50 - user.y-10; y < 50 - user.y+10; y ++) {
			
            var color = colors[map[x][y]];
            stage.addChild(draw.drawSquare(hCenter-GRID_SIZE/2+x*GRID_SIZE,vCenter-GRID_SIZE/2+y*GRID_SIZE, GRID_SIZE, GRID_SIZE, color));
        }
    }
}

draw.drawSquare = function(x, y, width, height, color) {
	var square = new createjs.Shape();
	square.graphics.beginFill(color);
	square.graphics.drawRect(1, 1, width-1, height-1);
	square.x = x;
	square.y = y;
	return square
}

draw.drawLine = function(x1, x2, y1, y2) {
	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(1).beginStroke("Gray");
	line.graphics.moveTo(x1, y1);
	line.graphics.lineTo(x2, y2);
	line.graphics.endStroke();
	return line;
}





