function Grid(data) {
	this.data = data ? data : {};
}
Grid.prototype.get = function(x,y) {
    var chunk = this.chunkStr(x,y);
	var xloc = this.getLoc(x), yloc = this.getLoc(y);
	
	if (!this.data[chunk] || !this.data[chunk][xloc] || !this.data[chunk][xloc][yloc] || this.data[chunk][xloc][yloc] == null )
		return false;
	
	return this.data[chunk][xloc][yloc];
    	
};

Grid.prototype.set = function(x, y, input) {
	var chunk = this.chunkStr(x,y);
	
	if (!this.data[chunk])
		this.initChunk(x,y);
	
	this.data[chunk][this.getLoc(x)][this.getLoc(y)] = input;
};

Grid.prototype.initChunk = function(x, y) {
	var chunk = this.chunkStr(x, y);
	this.data[chunk] = {};
	
	for (var i = 0; i < CHUNK_SIZE; i++) {
		this.data[chunk][i] = [];
		for (var j = 0; j < CHUNK_SIZE; j++)
			this.data[chunk][i][j] = null;
	}
}
	
Grid.prototype.chunkStr = function(x,y) {
	return Math.floor(x/CHUNK_SIZE)+":"+Math.floor(y/CHUNK_SIZE);
};

Grid.prototype.getLoc = function(loc) {
	return loc >= 0 ? loc%CHUNK_SIZE : (CHUNK_SIZE + loc%CHUNK_SIZE)%CHUNK_SIZE
}