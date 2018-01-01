var draw = {};
var colors = ["#2E7D32", "#DAF7A6", "#515A5A", "#21618C"];

draw.fillGrid = function(map, squares, container, width, height) {
	
    for (var x = user.x-2; x < user.x+3; x++) {
		for (var y =user.y-2; y < user.y+3; y ++) {
			if (!grid.get(x,y)) {
				var squ = draw.drawSquare(hCenter-GRID_SIZE/2+x*GRID_SIZE,vCenter-GRID_SIZE/2-y*GRID_SIZE, GRID_SIZE, GRID_SIZE, colors[map.get(x,y)]);
				grid.set(x, y, squ);
				container.addChild(squ);
			}
        }
    }
	for (var i in users) {
		
		if (!users[i].drawn && grid.get(users[i].coord.x, users[i].coord.y)) {
			users[i].drawn = true;
			container.addChild(users[i]);
		}
		container.setChildIndex(users[i], container.getNumChildren() - 1);
	}
}

draw.drawOtherUsers = function(data) {
	for (var i in data) {
		if (!_.has(users,i)) {
			var user = draw.drawUser(data[i].x, data[i].y, "Blue");
			users[i] = user;
			user.coord = {x:data[i].x, y: data[i].y};
			if (grid.get(data[i].x, data[i].y)) {
				user.drawn = true;
				container.addChild(user);
			} else
				user.drawn = false;
		} else {
			users[i].x = GRID_SIZE * data[i].x;
			users[i].y = -GRID_SIZE * data[i].y;
		}
	}
}

draw.drawUser = function(x, y, color) {
	
	var usr = new createjs.Container();
	usr.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 19, vCenter - GRID_SIZE/2 + 19, GRID_SIZE - 38, GRID_SIZE - 38, "Black"));
	usr.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 20, vCenter - GRID_SIZE/2 + 20, GRID_SIZE - 40, GRID_SIZE - 40, color));
	usr.x += x*GRID_SIZE;
	usr.y += y*GRID_SIZE;
	return usr;
}

draw.drawSquare = function(x, y, width, height, color, outline) {
	var square = new createjs.Shape();
	square.graphics.snapToPixil = true;
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





