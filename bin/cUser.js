module.exports = User;
var distance = require('euclidean-distance')

function User(user) {
	if (users.users[user])
		this.setUser(users.users[user]);
	else
		this.createUser(user);
};

// Generate list of users within given rage
User.prototype.checkLocal = function(users, range) {
    var updateList = {};

    for (var i in users) {
        if (this.id != i) {
            var otherUser = users[i];
            var dist = distance([otherUser.x, otherUser.y], [this.x, this.y]);
            if (dist <= range)
                updateList[i] = {x: otherUser.x, y: otherUser.y};
        }
    }

    return updateList;
}

User.prototype.getChunk = function() {
	var chunk = {};
	chunk.x = Math.floor(this.x/16);
	chunk.y = Math.floor(this.y/16);

	return chunk;
}

User.prototype.save = function () {
	users.users[this.id] = this;
	sys.saveJSON('users', users.users);
};

User.prototype.setUser =  function(user) {
    this.id = user.id;
    this.x = user.x;
    this.y = user.y;
    this.hunger = user.hunger;
    this.health = user.health;
    this.walked = user.walked;
    this.inventory = user.inventory;
    this.verbose = user.verbose;
    this.money = user.money;
    this.verbose = user.verbose;
    this.inactive = user.inactive;
    this.equiped = user.equiped;
    this.chunks = user.chunks;
};

User.prototype.createUser =  function(user) {
	this.id = user;
	this.x = 0;
	this.y = 0;
	this.hunger = 100;
	this.health = 100;
	this.walked = 0;
	this.inventory = [];
	this.verbose = true;
	this.money = 0;
	this.verbose = true;
	this.inactive = false;
	this.chunks = {};
	users.users[user] = this;
    this.save();
};

