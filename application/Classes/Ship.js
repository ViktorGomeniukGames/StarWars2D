var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');



function Ship(){
	// Create and configure ship
	ship = game.add.sprite(GLOBAL.WIDTH / 2, GLOBAL.HEIGHT / 2, 'ship');
	ship.anchor.setTo(0.5, 0.5);
	ship.life = 3;

	// Enable physic and set cameta to follow ship
	game.physics.enable(ship, Phaser.Physics.ARCADE);
	ship.body.collideWorldBounds = true;
	game.camera.follow(ship);

	// Create animation for ship
	ship.animations.add('move', null, 10, false, false);

	// Set ship methods for updating and destroying ship
	ship.desapear = function(){
		this.life -= 1;
	};
	ship.update = function(){
		if(this.life <= 0){
			game.state.start('Final', false, false, {});
		};
	};
	ship.fire = function(){
		// Fire with some timeout
		var fire = new Date().getTime() / 1000;
        if((fire - GLOBAL.LAST_SHOOT) > 0.25){
            GLOBAL.LAST_SHOOT = fire;
            GLOBAL.SHOOTS.push(new Shoot());
            fireSound.play();
        };
	};
	ship.moveForward = function(){
		this.animations.next(1);
        game.physics.arcade.velocityFromAngle(this.angle, 200, this.body.velocity);
	};
	ship.turnLeft = function(){
		this.rotation -= 0.05;
	};
	ship.turnRight = function(){
		this.rotation += 0.05;
	};
	ship.stopMoving = function(){
		this.body.velocity.x = 0;
	    this.body.velocity.y = 0;
	    this.body.angularVelocity = 0;
		this.animations.previous(1);
	};

	return ship;
};

module.exports = Ship;