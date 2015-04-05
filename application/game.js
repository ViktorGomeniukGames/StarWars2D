(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var getRandomInt = require('../Helper/Functions').getRandomInt;

var Asteroid = function(){
	// Create new object on random position
	var asteroid = game.add.sprite(getRandomInt(0, GLOBAL.WIDTH), getRandomInt(0, GLOBAL.HEIGHT), 'asteroid');
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
		x: getRandomInt(-3, 3) * GLOBAL.LEVEL,
		y: getRandomInt(-3, 3) * GLOBAL.LEVEL
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
},{"../Helper/Functions":5,"../Helper/Globals":6,"../Helper/Init":7}],2:[function(require,module,exports){
var game = require('../Helper/Init');


function Explosion(positionX, positionY){

	// Add sounds
	var explosionSound = game.add.audio('explosionSound');

	var explosion = game.add.sprite(positionX, positionY, 'explosion');
	explosion.anchor.setTo(0.5, 0.5);
	explosion.animations.add('fire', null);
	explosion.play = function(){
		explosion.animations.play('fire', 60, false, true);
		explosionSound.play();
	};
	return explosion;
};

module.exports = Explosion;
},{"../Helper/Init":7}],3:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');



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

	return ship;
};

module.exports = Ship;
},{"../Helper/Globals":6,"../Helper/Init":7}],4:[function(require,module,exports){
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
},{"../Helper/Globals":6,"../Helper/Init":7}],5:[function(require,module,exports){
var game = require('./Init');
var Explosion = require('../Classes/Explosion');
var GLOBAL = require('./Globals');


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function collideObjects(firstObject, secondObject){
	if(firstObject.key == "shoot"){
		GLOBAL.SCORE += 1;
	};
	var explosionPosition = {
		x: (firstObject.x + secondObject.x) / 2,
		y: (firstObject.y + secondObject.y) / 2
	};
	explosionSound = game.add.audio('explosion');
	var explosion = new Explosion(explosionPosition.x, explosionPosition.y);
	explosion.play();
	firstObject.desapear();
	secondObject.desapear();
};

var Functions = {
	getRandomInt: getRandomInt,
	collideObjects: collideObjects
};

module.exports = Functions;
},{"../Classes/Explosion":2,"./Globals":6,"./Init":7}],6:[function(require,module,exports){
var GLOBAL = {
	WIDTH: window.innerWidth - 20,
	HEIGHT: window.innerHeight - 20,
	LEVEL: 1,
	COMPLEXITY: 3,
	SHOOTS: [],
	ROCKS: [],
	LAST_SHOOT : new Date().getTime() / 1000,
	SCORE: 0
};

module.exports = GLOBAL;
},{}],7:[function(require,module,exports){
var GLOBAL = require('./Globals');

var game = new Phaser.Game(
	GLOBAL.WIDTH, GLOBAL.HEIGHT, Phaser.AUTO, ''
);
module.exports = game;
},{"./Globals":6}],8:[function(require,module,exports){
var game = require('./Init');

var MenuButton = function(text, position, clickHandler){
	// Create button object
	button = game.add.sprite(position.x, position.y, 'button');
	button.anchor.setTo(0.5, 0.5);
	button.scale.setTo(3, 2);
	button.animations.add('clicked', null, 10, false, false);
	button.inputEnabled = true;

	// Write text
	buttonText = game.add.bitmapText(position.x, position.y, 'carrier_command', text, 20);
	buttonText.anchor.setTo(0.5, 0.5);

	// Set handlers
	button.events.onInputDown.add(function(){
		button.animations.next(1);
	}, this);
	button.events.onInputUp.add(function(){
		button.animations.previous(1);
		if(clickHandler){
			clickHandler();
		};
	}, this);

	button.remove = function(){
		button.destroy();
		buttonText.destroy();
	};

	return button;
};

module.exports = MenuButton;
},{"./Init":7}],9:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var MenuButton = require('../Helper/MenuButton');

var finalState = {
	create: function(){
		finalText = game.add.bitmapText(GLOBAL.WIDTH / 2, GLOBAL.HEIGHT / 3, 'carrier_command', "You earned: " + GLOBAL.SCORE, 20);
		finalText.anchor.setTo(0.5, 0.5);
		new MenuButton('Try again', {x: GLOBAL.WIDTH / 2, y: GLOBAL.HEIGHT * 2 / 3},
			function(){
				game.state.start('Menu');
			}
		);
	}
};

module.exports = finalState;
},{"../Helper/Globals":6,"../Helper/Init":7,"../Helper/MenuButton":8}],10:[function(require,module,exports){
var game = require('../Helper/Init');
var MenuButton = require('../Helper/MenuButton');
var GLOBAL = require('../Helper/Globals');


var menuState = {
	preload: function(){
		game.load.image('logo', 'resourses/images/Logo.png');
		game.load.spritesheet('button', 'resourses/images/menu_button.png', 82, 32);
		game.load.bitmapFont('carrier_command', 'resourses/fonts/carrier_command.png', 'resourses/fonts/carrier_command.xml');
		game.load.audio('explosion', 'resourses/audio/explosion.wav');
		game.load.audio('soundtrack', 'resourses/audio/soundtrack.mp3');
	},
	create: function(){

		var soundtrack = game.add.audio('soundtrack');
		soundtrack.play();

		// Create logo and set its position
		logo = game.add.sprite(GLOBAL.WIDTH / 2, GLOBAL.HEIGHT / 4, 'logo');
		logo.scale.setTo(0.25, 0.25);
		logo.anchor.setTo(0.5, 0.5);

		// Create menu
		start = new MenuButton('Play', {x: GLOBAL.WIDTH / 2, y: GLOBAL.HEIGHT / 3 + 100},
			function(){
				// console.log(game.state.states.Menu.state.setCurrentState('Game'));
				game.state.states.Menu.state.pause()
				game.state.start('Game');
			}
		);
		text = "To accelerate use 'W'\n\n" + "To counter-clockwise use 'A'\n\n" + "To clockwise use 'D'\n\n" + "To shoot use 'Space'"
		hintText = game.add.bitmapText(GLOBAL.WIDTH / 2 + 50, GLOBAL.HEIGHT * 3 / 4,
			'carrier_command', text, 20);
		hintText.anchor.setTo(0.5, 0.5);
	},
	shutdown: function(){
		console.log(arguments);
		// When closing - turn soundtrack off
		soundtrack.stop();
	}
};

module.exports = menuState;
},{"../Helper/Globals":6,"../Helper/Init":7,"../Helper/MenuButton":8}],11:[function(require,module,exports){
var game = require('../Helper/Init');
var MenuButton = require('../Helper/MenuButton');
var GLOBAL = require('../Helper/Globals');
var getRandomInt = require('../Helper/Functions').getRandomInt;
var collideObjects = require('../Helper/Functions').collideObjects;
var Shoot = require('../Classes/Shoot');
var Asteroid = require('../Classes/Asteroid');
var Ship = require('../Classes/Ship');
var Explosion = require('../Classes/Explosion');



var playState = {preload: preload, create: create, update: update };


// Load media
function preload(){
	game.load.image('firstBackgroundLayer', 'resourses/images/firstBackgroundLayer.png');
	game.load.image('shoot', 'resourses/images/shot1.png');
	game.load.spritesheet('ship', 'resourses/images/ship.png', 90, 90);
	game.load.spritesheet('asteroid', 'resourses/images/asteroid.png', 128, 128);
	game.load.spritesheet('explosion', 'resourses/images/explosion.png', 128, 128);
    game.load.audio('explosionSound', 'resourses/audio/explosion.wav');
};

// Create game
function create(){

	// Reset data
	GLOBAL.SCORE = 0;
	GLOBAL.ROCKS = [];
	GLOBAL.SHOOTS = [];

	// Enable physic
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// game.world.setBounds(0, 0, 1920, 1080);

	// load background image
	var background = game.add.sprite(0, 0, 'firstBackgroundLayer');

	// Create and configure player
	player = new Ship();

	scoreText = game.add.bitmapText(10, 10, 'carrier_command', 'Score: ' + GLOBAL.SCORE, 20);
	scoreText.update = function(){
		scoreText.text = 'Score: ' + GLOBAL.SCORE;
	}
	scoreText.anchor.setTo(0, 0);

	livesText = game.add.bitmapText(10, 30, 'carrier_command', 'Lives: ' + player.life, 20);
	livesText.update = function(){
		livesText.text = 'Lives: ' + player.life;
	}

};
// Update game state
function update(){

	// Set player's physic
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.angularVelocity = 0;

    // Set player's control combo
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
    	player.animations.next(1);
    	game.physics.arcade.velocityFromAngle(player.angle, 200, player.body.velocity);
    } else {
    	player.animations.previous(1);
    };
	if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
        player.rotation -= 0.05;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
    	player.rotation += 0.05;
        
    };
    if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
    	// Fire with some timeout
    	var fire = new Date().getTime() / 1000;
    	if((fire - GLOBAL.LAST_SHOOT) > 0.25){
    		GLOBAL.LAST_SHOOT = fire;
    		GLOBAL.SHOOTS.push(new Shoot());
    	};
    };
    // Check how many asteroids there are on map
    if(GLOBAL.ROCKS.length < GLOBAL.LEVEL * GLOBAL.COMPLEXITY){
    	GLOBAL.ROCKS.push(new Asteroid());
    };

    // Add collision between player, shoots and asteroids
    game.physics.arcade.collide(GLOBAL.SHOOTS, GLOBAL.ROCKS, collideObjects, null, this);
    for (var r = 0; r < GLOBAL.ROCKS.length; r++){
    	var rock = GLOBAL.ROCKS[r];
    	var distance = game.math.distance(rock.x, rock.y, player.x, player.y);
    	if (distance < 60){
    		collideObjects(player, rock);
    	};
    };
    // Add handler for escape key
	if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
		game.state.start('Final');
    };
};

module.exports = playState;
},{"../Classes/Asteroid":1,"../Classes/Explosion":2,"../Classes/Ship":3,"../Classes/Shoot":4,"../Helper/Functions":5,"../Helper/Globals":6,"../Helper/Init":7,"../Helper/MenuButton":8}],12:[function(require,module,exports){
// Load required modules
var game = require('./Helper/Init');
var MenuButton = require('./Helper/MenuButton');
var menuState = require('./States/MenuState');
var finalState = require('./States/FinalState');
var playState = require('./States/PlayState');

// Add different states to game
game.state.add('Final', finalState);
game.state.add('Game', playState);
game.state.add('Menu', menuState);

// Start game loading menu
game.state.start('Menu');
},{"./Helper/Init":7,"./Helper/MenuButton":8,"./States/FinalState":9,"./States/MenuState":10,"./States/PlayState":11}]},{},[12]);
