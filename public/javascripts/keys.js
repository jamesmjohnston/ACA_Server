var keys = {};

keys.moveCall = function(container, dir) {
	moving = true;	
	sys.Rest('users/move/' + dir).then(function (result) {
		if (!_.isEmpty(result)) {
			for (var i in result)
				if (!_.has(map.data, i))
					map.data[i] = result[i];
		}
		draw.fillGrid(map, grid, container, w, h);
	});
};

keys.handleKeys = function(container) {
	if (!_.isEmpty(keyState)) {
		if (!moving) {
			if (keyState[37] || keyState[65]){
				this.moveCall(container, 0);
				user.x--;
				createjs.Tween.get(container).to({x:container.x+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}     
			else if (keyState[38] || keyState[87]){
				this.moveCall(container, 1);
				user.y++;
				createjs.Tween.get(container).to({y:container.y+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}  
			else if  (keyState[39] || keyState[68]){
				this.moveCall(container, 2);
				user.x++;
				createjs.Tween.get(container).to({x:container.x-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}   
			else if (keyState[40] || keyState[83]){
				this.moveCall(container, 3);
				user.y--
				createjs.Tween.get(container).to({y:container.y-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}
		}
	}
}
