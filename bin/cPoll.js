module.exports = Poll;

function Poll(data) {
    this.data = data ? data : {};
};

function PollItem(res, free, sending, data) {
    this.res = res;
    this.free = free;
    this.sending = sending;
    this.data = data;
}

PollItem.prototype.send = function() {
    console.log(this.free+"-"+this.sending+"-"+(this.res!=null));
    if (this.free && this.sending && this.res) {
        this.free = false;
        this.sending = false;
        this.res.send(this.data);
    }
}

Poll.prototype.get = function(id) {
    if (!_.has(this.data, id))
        this.data[id] = new PollItem(null, true, false, {});
	
    return this.data[id];
}

Poll.prototype.add = function(req, res) {
    var id = req.headers.authorization;
    var item = this.get(id);
    item.res = res;
    item.free = true;

    if (this.data[id].sending)
        this.data[id].send();
}

Poll.prototype.remove = function (req, res) {
    var id = req.header.authorization;
    delete this.data[id];
}

Poll.prototype.update = function(id, data) {
    var item = this.get(id);
    if (!_.isEqual(item.data, data)) {
        console.log("sending:"+id);
        item.data = data;
        item.sending = true;
        item.send();
    }
}
