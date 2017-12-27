var sys = require('../bin/sys.js')('/home/ec2-user/node_modules/aca-server/data')

module.exports = User;

function User(user) {
	if (users.users[user])
		this.setUser(users.users[user]);
	else
		this.createUser(user);
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
	users.users[user] = this;
    this.save();
};

User.prototype.save = function () {
	users.users[this.id] = this;
	sys.saveJSON('users', users.users);
};
