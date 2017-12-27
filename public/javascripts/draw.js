var draw = {};

draw.fillGrid = function(map, stage, width, height) {
	var colors = ["#2E7D32", "#DAF7A6", "#515A5A", "#21618C"];
    for (var x = 0; x < map.length; x++) {
		for (var y = 0; y < map[0].length; y ++) {
			
            var color = colors[map[x][y]];
            stage.addChild(draw.drawSquare(x*GRID_SIZE,y*GRID_SIZE, GRID_SIZE, GRID_SIZE, color));
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





