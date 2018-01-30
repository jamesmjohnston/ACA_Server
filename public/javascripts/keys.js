var keys = {moving: false};

keys.moveCall = function(draw, dir) {
    this.moving = true;	
    sys.Rest('users/move/' + dir).then(function (result) {
        if (!_.isEmpty(result)) {
            for (var i in result)
                if (!_.has(draw.map.data, i))
                    draw.map.data[i] = result[i];
        }
        draw.fillGrid();
    });
};

keys.moveCallback = function() {
    keys.moving = false;
};

keys.handleKeys = function(draw) {
    if (!_.isEmpty(keyState)) {
        if (!this.moving) {
            if (keyState[37] || keyState[65]){
                this.moveCall(draw, 0);
                draw.user.x--;
                createjs.Tween.get(draw.target).to({x: draw.target.x + GRID_SIZE}, MOVE_SPEED).call(this.moveCallback);
            }
            else if (keyState[38] || keyState[87]){
                this.moveCall(draw, 1);
                draw.user.y++;
                createjs.Tween.get(draw.target).to({y: draw.target.y + GRID_SIZE}, MOVE_SPEED).call(this.moveCallback);
            }
            else if  (keyState[39] || keyState[68]){
                this.moveCall(draw, 2);
                draw.user.x++;
                createjs.Tween.get(draw.target).to({x: draw.target.x - GRID_SIZE}, MOVE_SPEED).call(this.moveCallback);
            }
            else if (keyState[40] || keyState[83]){
                this.moveCall(draw, 3);
                draw.user.y--;
                createjs.Tween.get(draw.target).to({y: draw.target.y - GRID_SIZE}, MOVE_SPEED).call(this.moveCallback);
            }
        }
    }
};
