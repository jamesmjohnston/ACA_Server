var keys = {};

keys.handleKeys = function(container) {
	if (!_.isEmpty(keyState)) {
		if (!moving) {
			if (keyState[37] || keyState[65]){
				moving = true;	
				sys.Rest('user/move/0');
				createjs.Tween.get(container).to({x:container.x+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}     
			else if (keyState[38] || keyState[87]){
				moving = true;	
				sys.Rest('user/move/1');
				createjs.Tween.get(container).to({y:container.y+GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}  
			else if  (keyState[39] || keyState[68]){
				moving = true;	
				sys.Rest('user/move/2');
				createjs.Tween.get(container).to({x:container.x-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}   
			else if (keyState[40] || keyState[83]){
				moving = true;	
				sys.Rest('user/move/3');
				createjs.Tween.get(container).to({y:container.y-GRID_SIZE}, MOVE_SPEED).call(handleComplete);
			}
		}
	}
}