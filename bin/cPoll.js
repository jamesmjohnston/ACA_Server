module.exports = Poll;

function Poll(data) {
	this.data = data ? data : {};
};

function PollItem (res, free, sending, data) {
	this.res = res;
	this.free = free;
	this.sending = sending;
	this.data = data;
}

PollItem.prototype.send = function() {
	if (this.free && this.sending) {
		this.free = false;
		this.sending = false;
		this.res.send(this.data);
	}
}

Poll.prototype.get = function(ip) {
	if (!_.has(this.data, ip))
		this.data[ip] = new PollItem(null, true, false, {});
	
	return this.data[ip];
}

Poll.prototype.add = function(req, res) {
	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	var item = this.get(ip);
	item.res = res;
	item.free = true;
	if (this.data[ip].sending)
		this.data[ip].send();
	
}

Poll.prototype.update = function(ip, data) {
	var item = this.get(ip);
	if (!_.isEqual(item.data, data)) {
		item.data = data;
		item.sending = true;
		item.send();
	}
}