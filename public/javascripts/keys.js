var keys = {};

keys.moveCall = function(draw, dir) {
	moving = true;	
	sys.Rest('users/move/' + dir).then(function (result) {
		if (!_.isEmpty(result)) {
			for (var i in result)
				if (!_.has(draw.map.data, i))
					draw.map.data[i] = result[i];
		}
		draw.fillGrid();
	});
};

keys.handleKeys = function(draw) {
	if (!_.isEmpty(keyState)) {
		if (!moving) {
			if (keyState[37] || keyState[65]){
				this.moveCall(draw, 0);
				user.x--;
				createjs.Tween.get(draw.target).to({x:draw.target.x+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}     
			else if (keyState[38] || keyState[87]){
				this.moveCall(draw, 1);
				user.y++;
				createjs.Tween.get(draw.target).to({y:draw.target.y+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}  
			else if  (keyState[39] || keyState[68]){
				this.moveCall(draw, 2);
				user.x++;
				createjs.Tween.get(draw.target).to({x:draw.target.x-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}   
			else if (keyState[40] || keyState[83]){
				this.moveCall(draw, 3);
				user.y--
				createjs.Tween.get(draw.target).to({y:draw.target.y-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}
		}
	}
}
