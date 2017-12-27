var map = {};

map.readTerrain = function(data) {
	data = data.split('\r\n');
	
	var dims = data[0].split('-');
	this.width = parseInt(dims[0]);
	this.height = parseInt(dims[1]);
	var map = new Array(this.height);
	for (var y = 0; y < this.height; y++) {
		map[y] =  new Array(this.width);
		for (var x = 0; x < this.width; x++)
			map[y][x] =  data[y+1].charAt(x);
	}
	//console.log(map.toString());
	this.width = (this.width - 1)/2;
	this.height = (this.height - 1)/2;
	return map;
};

