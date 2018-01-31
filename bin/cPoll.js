module.exports = Poll;

var User = require('./cUser.js');

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
    // check if request is available, wants to send, and has an open user
    if (this.free && this.sending && this.res) {
        // unfree request and reset sending status
        this.free = false;
        this.sending = false;
        this.res.send(this.data);
    }
}

Poll.prototype.get = function(id) {
    if (!id)
        return null;
    // fetch\add poll by Id
    if (!_.has(this.data, id))
        this.data[id] = new PollItem(null, true, false, {});
	
    return this.data[id];
}

Poll.prototype.init = function(id, res) {
    if (id) {
        console.log("polling " + id);
        this.recieve(id, res);
        this.data[id].data = {}

        var user = new User(id), updateList = {};
        if (!_.isEmpty(updateList = user.checkLocal(users.users))) 
            this.update(id, updateList);
    }
}

Poll.prototype.recieve = function(id, res) {
    if (id) {
        var item = this.get(id);
        item.res = res;
        item.free = true;

        // if user has data waiting, send reply
        if (this.data[id].sending)
            this.data[id].send();
    }
}

// Removes use from poll on logout
Poll.prototype.remove = function (id, res) {
    if (id) {
        console.log("killing " + id);
        delete this.data[id];
    }
}

Poll.prototype.update = function(id, data) {
    if (id) {
        var item = this.get(id);

        // if data has changed
        if (!_.isEqual(item.data, data)) {
            // update data
            item.data = data;

            // prime request for response
            // if request isn't open, it will respond immediately to next poll
            item.sending = true;
            item.send();
        }
    }
}

Poll.prototype.pollLocalUsers = function(user, users) {
    var updateList = {}

    // Find all users in range and update
    if (!_.isEmpty(updateList = user.checkLocal(users))) 
        this.update(user.id, updateList);

    // Poll all users that were in range
    var teather = {};
    for (var tid in updateList) {
        var teatherUser = new User(tid);

        if (!_.isEmpty(teather = teatherUser.checkLocal(users)))
           this.update(tid, teather);				
    }
}
