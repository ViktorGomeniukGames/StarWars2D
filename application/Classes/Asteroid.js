var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var getRandomInt = require('../Helper/Functions').getRandomInt;

var Asteroid = function(){
	// Generate new random position
	var newPosition = {
		x: getRandomInt(0, GLOBAL.WIDTH),
		y: getRandomInt(0, GLOBAL.HEIGHT)
	};
	// Do not create new asteroid near player
	var distance = game.math.distance(newPosition.x, newPosition.y, player.x, player.y);
	if (distance < 100){
		return Asteroid();
	};

	// Create new object
	var asteroid = game.add.sprite(newPosition.x, newPosition.y, 'asteroid');

	asteroid.anchor.setTo(0.5, 0.5);
	asteroid.scale.setTo(0.5, 0.5);

	// Enable physic and set action when asteroid collides world bounds
	game.physics.enable(asteroid, Phaser.Physics.ARCADE);
	asteroid.checkWorldBounds = true;
	asteroid.events.onOutOfBounds.add(
		function(){
			asteroid.desapear();
		}, this
	);

	// Enable animation
	asteroid.animations.add('move', null, 20, true, false);
	asteroid.play('move');

	// Set random velocity
	asteroid.velocity = {
		x: getRandomInt(-3, 3),
		y: getRandomInt(-3, 3)
	};

	// Update position of asteroid
	asteroid.update = function(){
		asteroid.position.x += asteroid.velocity.x;
		asteroid.position.y += asteroid.velocity.y;
	};

	// Method to destroy this rock
	asteroid.desapear = function(){
		this.destroy();
		GLOBAL.ROCKS.splice(GLOBAL.ROCKS.indexOf(this), 1);
	};
	return asteroid;
};

module.exports = Asteroid;