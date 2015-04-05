var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');


var Shoot = function(){
	// Create new bullet, configure it and add physic   	
	var shoot = game.add.sprite(player.x, player.y, 'shoot');
	shoot.anchor.setTo(0.5, 0.5);
	game.physics.enable(shoot, Phaser.Physics.ARCADE);

	// Set moving direction and speed
	game.physics.arcade.velocityFromAngle(player.angle, 400, shoot.body.velocity);

	// Set start velocity
	shoot.velocity = {
		x: 10,
		y: 10
	};

	// Remove bullet
	shoot.desapear = function(){
		this.destroy();
		GLOBAL.SHOOTS.splice(GLOBAL.SHOOTS.indexOf(this), 1);
	};

	// Add method to expire bullet after some period of time
	var created = new Date().getTime() / 1000;
	shoot.expire = function(){
		var timeStamp = new Date().getTime() / 1000;
		if((timeStamp - created) > 1){
			this.desapear();
		}
	};

	// Set method to update shoot's state
	shoot.update = function(){
		this.expire();
	};

	return shoot;
};

module.exports = Shoot;