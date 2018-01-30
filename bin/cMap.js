module.exports = Map;

function Map(filename) {
	this.data = sys.loadJSON('map');
}

Map.prototype.initView = function(coord) {
	var view = {};
	var list = this.getVisibleChunks(coord);
	for (var item in list)
		view[list[item]]=this.data[list[item]];

	return view;
};

Map.prototype.getVisibleChunks = function(coord) {
	var list = [];
	
	for (var x = coord.x - 8; x < coord.x + 9; x += 16)
		for (var y = coord.y - 8; y < coord.y + 9; y += 16)
			list.push(this.getIndex(x,y));
	return list;
}

Map.prototype.readTerrain = function(data) {
	var map = {};
	
	data = data.split('\n');
	
	for (var y = 0; y < 6; y++) {
		for (var x = 0; x < 6; x++) {
			map[(x-2)+":"+(y-2)] = [];
			for (var i = 0; i < 16; i++) {
				map[(x-2)+":"+(y-2)][i] = [];
				for (var j = 0; j < 16; j++)
					map[(x-2)+":"+(y-2)][i][j] =  data[y*16+j].charAt(x*16+i);
			}
		}
	}
	return map;
};

Map.prototype.getIndex = function(x, y) {
	return this.getChunk(x)+":"+this.getChunk(y);
}

Map.prototype.getChunk = function(num) {
	return Math.floor(num/16);
}
