var colors = ["#2E7D32", "#DAF7A6", "#515A5A", "#21618C"];

function Draw(target, map, grid, user) {
	this.target = target;
	this.map = map;
	this.grid = grid;
    this.user = user;
}

Draw.prototype.fillGrid = function() {
    for (var x = user.x-2; x < user.x+3; x++) {
        for (var y =user.y-2; y < user.y+3; y ++) {
            if (!this.grid.get(x,y)) {
                var squ = this.drawSquare(hCenter-GRID_SIZE/2+x*GRID_SIZE,vCenter-GRID_SIZE/2-y*GRID_SIZE, GRID_SIZE, GRID_SIZE, colors[this.map.get(x,y)]);
                this.grid.set(x, y, squ);
                this.target.addChild(squ);
            }
        }
    }
    this.refreshUserList(users);
}

Draw.prototype.refreshUserList =  function(userList) {
    for (var i in userList) {
        if (this.grid.get(userList[i].coord.x, userList[i].coord.y)) {
            if (!userList[i].drawn ) {
                userList[i].drawn = true;
                this.target.addChild(userList[i]);
            } else
                this.target.setChildIndex(userList[i], this.target.getNumChildren() - 1);
        }
    }
}

Draw.prototype.drawOtherUsers = function(data, userList) {
	for (var i in data) {
		if (i != this.user.username) {
			if (!_.has(userList,i)) {
				var user = this.drawUser(data[i].x, data[i].y, "Blue");
				userList[i] = user;
				user.coord = {x:data[i].x, y: data[i].y};
				if (this.grid.get(data[i].x, data[i].y)) {
					user.drawn = true;
					this.target.addChild(user);
				} else
					user.drawn = false;
			} else if (userList[i].drawn) {
				
				createjs.Tween.get(userList[i]).to({x:data[i].x*GRID_SIZE}, MOVE_SPEED).call();
				createjs.Tween.get(userList[i]).to({y:-data[i].y*GRID_SIZE}, MOVE_SPEED).call();
			}
		}
	}
}

Draw.prototype.drawUser = function(x, y, color) {
	var usr = new createjs.Container();
	usr.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 19, vCenter - GRID_SIZE/2 + 19, GRID_SIZE - 38, GRID_SIZE - 38, "Black"));
	usr.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 20, vCenter - GRID_SIZE/2 + 20, GRID_SIZE - 40, GRID_SIZE - 40, color));
	usr.x += x*GRID_SIZE;
	usr.y += y*GRID_SIZE;
        return usr;
}

Draw.prototype.drawSquare = function(x, y, width, height, color, outline) {
	var square = new createjs.Shape();
	square.graphics.snapToPixil = true;
	square.graphics.beginFill(color);
	square.graphics.drawRect(1, 1, width-1, height-1);
	square.x = x;
	square.y = y;
	return square
}

Draw.drawLine = function(x1, x2, y1, y2) {
	var line = new createjs.Shape();
	line.graphics.setStrokeStyle(1).beginStroke("Gray");
	line.graphics.moveTo(x1, y1);
	line.graphics.lineTo(x2, y2);
	line.graphics.endStroke();
    return line;
}





