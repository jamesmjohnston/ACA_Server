var draw = {};

draw.fillGrid = function(stage, width, height) {
	var colors = ["#2E7D32", "#515A5A", "#DAF7A6"];
    for (var x = 0; x < width; x += GRID_SIZE) {
		for (var y = 0; y < height; y += GRID_SIZE) {
			
            var color = colors[sys.rng(0,2)];
            stage.addChild(draw.drawSquare(x,y, GRID_SIZE, GRID_SIZE, color));
        }
    }
}

draw.drawSquare = function(x, y, width, height, color) {
	var square = new createjs.Shape();
	square.graphics.beginFill(color);
	square.graphics.drawRect(1, 1, width-2, height-2);
	square.x = x;
	square.y = y;
	return square
}

draw.generateGrid = function(stage, width, height) {
    for (var x = 0; x < width; x += GRID_SIZE)
		stage.addChild(draw.drawLine(x, x, 0, height));
	
    for (var y = 0; y < height; y += GRID_SIZE)
		stage.addChild(draw.drawLine(0, width, y, y));
}

draw.drawLine = function(x1, x2, y1, y2) {
	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(2).beginStroke("Black");
	line.graphics.moveTo(x1, y1);
	line.graphics.lineTo(x2, y2);
	line.graphics.endStroke();
	return line;
}





