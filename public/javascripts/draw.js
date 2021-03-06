var colors = ["#2E7D32", "#DAF7A6", "#515A5A", "#21618C"];

function Draw(target, stage, map, grid, user, users) {
	this.target = target;
    this.stage = stage;
	this.map = map;
	this.grid = grid;
    this.user = user;
    this.users = users;
}

Draw.prototype.fillGrid = function() {
    for (var x = this.user.x - 2; x < this.user.x + 3; x++) {
        for (var y = this.user.y-2; y < this.user.y + 3; y++) {
            if (!this.grid.get(x,y)) {
                var squ = this.drawSquare(hCenter - GRID_SIZE / 2 + x * GRID_SIZE,
                 vCenter - GRID_SIZE / 2 - y * GRID_SIZE,
                  GRID_SIZE, GRID_SIZE, colors[this.map.get(x, y)]);

                this.grid.set(x, y, squ);
                this.target.addChild(squ);
            }
        }
    }
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

Draw.prototype.drawOtherUsers = function(data) {
	for (var i in data) {
		if (i != this.user.username) {
			if (!_.has(this.users, i)) {
				var newUser = this.drawUser(data[i].x, data[i].y, "Blue", i);
				newUser.coord = {x:data[i].x, y: data[i].y};

				if (this.grid.get(data[i].x, data[i].y)) {
					newUser.drawn = true;
					this.target.addChild(newUser);
				} else
					newUser.drawn = false;
				this.users[i] = newUser;
			} else if (this.users[i].drawn) {
				
				createjs.Tween.get(this.users[i]).to({x:data[i].x*GRID_SIZE}, MOVE_SPEED).call();
				createjs.Tween.get(this.users[i]).to({y:-data[i].y*GRID_SIZE}, MOVE_SPEED).call();
			}
		}
	}
    this.refreshUserList(users);
}

Draw.prototype.drawUser = function(x, y, color, name) {
    var newUser = new createjs.Container();
    newUser.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 19, vCenter - GRID_SIZE/2 + 19, GRID_SIZE - 38, GRID_SIZE - 38, "Black"));
    newUser.addChild(this.drawSquare(hCenter - GRID_SIZE/2 + 20, vCenter - GRID_SIZE/2 + 20, GRID_SIZE - 40, GRID_SIZE - 40, color));
    var text =new createjs.Text(name, "20px Arial", "Black");
    text.textAlign="center";
    text.x = hCenter;
    text.y = vCenter - GRID_SIZE*.55;
    newUser.addChild(text);
    newUser.x += x * GRID_SIZE;
    newUser.y += y * GRID_SIZE;
    return newUser;
}

Draw.prototype.drawSquare = function(x, y, width, height, color, outline) {
    var square = new createjs.Shape();
    square.graphics.snapToPixil = true;
    square.graphics.beginFill(color);
    square.graphics.drawRect(1, 1, width-1, height-1);
    square.x = x;
    square.y = y;
    return square
};

Draw.prototype.drawLine = function(x1, x2, y1, y2) {
    var line = new createjs.Shape();
    line.graphics.setStrokeStyle(1).beginStroke("Gray");
    line.graphics.moveTo(x1, y1);
    line.graphics.lineTo(x2, y2);
    line.graphics.endStroke();
    return line;
};

Draw.prototype.handleKeys = function() {
    keys.handleKeys(this);
};
