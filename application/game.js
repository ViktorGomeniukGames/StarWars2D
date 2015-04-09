(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../Helper/Functions":9,"../Helper/Globals":10,"../Helper/Init":11}],2:[function(require,module,exports){
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
},{"../Helper/Init":11}],3:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');



function Ship(){
	// Create and configure ship
	ship = game.add.sprite(960, 540, 'ship');
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
},{"../Classes/Shoot":4,"../Helper/Globals":10,"../Helper/Init":11}],4:[function(require,module,exports){
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
},{"../Helper/Globals":10,"../Helper/Init":11}],5:[function(require,module,exports){
// var game = require('../Helper/Init');
// var GLOBAL = require('../Helper/Globals');
// var Shoot = require('../Classes/Shoot');
var Keyboard = require('./Keyboard');
var Gamepad = require('./Gamepad');
var Touch = require('./Touch');


var CONTROLS = function(player){
	// var controlMethod = new Keyboard(player);
    var controlMethod = new Touch(player);
    return {
    	preload: controlMethod.preload,
    	create: controlMethod.create,
    	update: controlMethod.update
    };
};

module.exports = CONTROLS;
},{"./Gamepad":6,"./Keyboard":7,"./Touch":8}],6:[function(require,module,exports){
var game = require('../Helper/Init');


var Gamepad = function(player){
	var update = function(){};
	// var control = new Phaser.Gamepad(game);
	// control.start();
	// control.addCallbacks(game, {
	// 	onConnectCallback: function(){console.log('onConnectCallback')},
	// 	onDisconnectCallback: function(){console.log('onDisconnectCallback')},
	// 	onDownCallback: function(){console.log('onDownCallback')},
	// 	onUpCallback: function(){console.log('onUpCallback')},
	// 	onAxisCallback: function(){console.log('onAxisCallback')},
	// 	onFloatCallback: function(){console.log('onFloatCallback')}
	// });



    // Temp gamepad
 //    game.input.gamepad.start();
 //    console.log(game.input.gamepad);
	// pad1 = game.input.gamepad.pad1;
	// console.log(pad1.connected);
	return {
		update: update
	};
};

module.exports = Gamepad;
},{"../Helper/Init":11}],7:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');


var Keyboard = function(){

    var update = function(){
        // Set player's control combo
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            player.moveForward();
        } else {
            player.stopMoving();
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            player.turnLeft();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.turnRight();
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            player.fire();
        };

        // Add handler for escape key
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            game.state.start('Final');
        };
    };

    return {
        preload: function(){
            console.log('Nothing to preload');
        },
        update: update,
        create: function(player){
            console.log('Nothing to create');
        }
    };
};

module.exports = Keyboard;
},{"../Helper/Globals":10,"../Helper/Init":11}],8:[function(require,module,exports){
var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');
var TouchButton = require('../Helper/TouchButton');


var Touch = function(){

    // Set game properties
    var __FORWARD = false;
    var __LEFT = false;
    var __RIGHT = false;
    var __FIRE = false;

    var create = function(player){
        var that = this;
        // Create fireButton
        var fireButton = new TouchButton(
            {
                x: GLOBAL.WIDTH - 60,
                y: GLOBAL.HEIGHT - 50
            }, 5, 5, function(){player.fire()}, 1, 1);
        // Create exitButton
        var exitButton = new TouchButton({
            x: 60,
            y: 60
        }, 9, 9, function(){
            game.state.start('Final');
        }, 1, 1);
        var pad = new TouchButton({
            x: 90, y: GLOBAL.HEIGHT - 90
        }, 8, 8, padControl, 1.5, 1.5);
    };
    var padControl = function(button, point){
        console.log(button);
        console.log(point);
    };

    var update = function(){
        // player.body.velocity.x = 0;
        // player.body.velocity.y = 0;
        // player.body.angularVelocity = 0;

        // // Moving combo
        // switch(__LEFT, __FORWARD, __RIGHT){
        //     // Rotate left
        //     case true, false, false:
        //         player.rotation -= 0.05;

        //     // Rotate right
        //     case false, false, true:
        //         player.rotation += 0.05;

        //     // Move forward
        //     case false, true, false:
        //         player.animations.next(1);
        //         game.physics.arcade.velocityFromAngle(player.angle, 200, player.body.velocity);

        //     // Otherwise - stop animation and do nothing
        //     default:
        //         player.animations.previous(1);
        //         // player.body.angularVelocity = 0;

        // };
        // // Fire
        // if(__FIRE){
        //     var fire = new Date().getTime() / 1000;
        //     if((fire - GLOBAL.LAST_SHOOT) > 0.25){
        //         GLOBAL.LAST_SHOOT = fire;
        //         GLOBAL.SHOOTS.push(new Shoot());
        //         fireSound.play();
        //     };
        // };
    };

    var preload = function(){
        // // Preload buttons
        // game.load.spritesheet('horizontalButton', 'resourses/images/joystick/horizontal.png', 64, 64);
        // game.load.spritesheet('verticalButton', 'resourses/images/joystick/vertical.png', 96, 64);
        // game.load.spritesheet('diagonalButton', 'resourses/images/joystick/diagonal.png', 64, 64);
        // game.load.spritesheet('fireButton', 'resourses/images/joystick/round.png', 96, 96);
        game.load.spritesheet('gamepad', 'resourses/images/joystick/xbox360.png', 102.4, 102.5);
    };

    return {
        preload: preload,
        create: create,
        update: update
    };
};

module.exports = Touch;
},{"../Classes/Shoot":4,"../Helper/Globals":10,"../Helper/Init":11,"../Helper/TouchButton":13}],9:[function(require,module,exports){
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
},{"../Classes/Explosion":2,"./Globals":10,"./Init":11}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
var GLOBAL = require('./Globals');

var game = new Phaser.Game(
	GLOBAL.WIDTH, GLOBAL.HEIGHT, Phaser.AUTO, ''
);
module.exports = game;
},{"./Globals":10}],12:[function(require,module,exports){
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
},{"./Init":11}],13:[function(require,module,exports){
var game = require('./Init');

var TouchButton = function(position, startFrame, animFrame, clickHandler, scaleX, scaleY){

    var button = game.add.sprite(position.x, position.y, 'gamepad');
        button.scale.setTo(scaleX, scaleY);
    	button.animations.add('clicked', frames, 10, false, false);
    	button.animations.frame = startFrame;
        button.anchor.setTo(0.5, 0.5);
        button.inputEnabled = true;
        button.fixedToCamera = true;

        // Set handlers
        button.events.onInputDown.add(function(){
            button.animations.frame = animFrame;
            if(clickHandler){
            	clickHandler(arguments[0], arguments[1]);
            };
        }, this);
		button.events.onInputUp.add(function(){
			button.animations.frame = startFrame;
		}, this);

    return button;
};

module.exports = TouchButton;
},{"./Init":11}],14:[function(require,module,exports){
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
},{"../Helper/Globals":10,"../Helper/Init":11,"../Helper/MenuButton":12}],15:[function(require,module,exports){
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

		// Add soundtrack
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
	shutdown: function(game){
		// Stop playing soundtrack on shutdown
		game.sound.stopAll();
	}
};

module.exports = menuState;
},{"../Helper/Globals":10,"../Helper/Init":11,"../Helper/MenuButton":12}],16:[function(require,module,exports){
// Load helper functions and modules
var game = require('../Helper/Init');
var MenuButton = require('../Helper/MenuButton');
var GLOBAL = require('../Helper/Globals');
var getRandomInt = require('../Helper/Functions').getRandomInt;
var collideObjects = require('../Helper/Functions').collideObjects;
var CONTROLS = require('../Control/Control');

// Load classes
var Shoot = require('../Classes/Shoot');
var Asteroid = require('../Classes/Asteroid');
var Ship = require('../Classes/Ship');
var Explosion = require('../Classes/Explosion');

// Create playState
var playState = {preload: preload, create: create, update: update };

// Load media
function preload(){
	game.load.image('firstBackgroundLayer', 'resourses/images/firstBackgroundLayer.png');
	game.load.image('shoot', 'resourses/images/shot1.png');
	game.load.spritesheet('ship', 'resourses/images/ship.png', 90, 90);
	game.load.spritesheet('asteroid', 'resourses/images/asteroid.png', 128, 128);
	game.load.spritesheet('explosion', 'resourses/images/explosion.png', 128, 128);
    game.load.audio('explosionSound', 'resourses/audio/explosion.wav');
    game.load.audio('fire', 'resourses/audio/laser.wav');

    control = new CONTROLS();
    control.preload();

};

// Create game
function create(){

	// Reset data
	GLOBAL.SCORE = 0;
	GLOBAL.ROCKS = [];
	GLOBAL.SHOOTS = [];

	// Enable physic and reset world bounds
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.world.setBounds(0, 0, 1920, 1080);

	// load background image
	var background = game.add.sprite(0, 0, 'firstBackgroundLayer');

	// Create and configure player
	player = new Ship();

    // Add proper text output
	scoreText = game.add.bitmapText(GLOBAL.WIDTH - 10, 10, 'carrier_command', 'Score: ' + GLOBAL.SCORE, 20);
	scoreText.update = function(){
		scoreText.text = 'Score: ' + GLOBAL.SCORE;
	}
	scoreText.anchor.setTo(1, 0);
    scoreText.fixedToCamera = true;
	livesText = game.add.bitmapText(GLOBAL.WIDTH - 10, 30, 'carrier_command', 'Lives: ' + player.life, 20);
	livesText.update = function(){
		livesText.text = 'Lives: ' + player.life;
	}
	livesText.anchor.setTo(1, 0);
    livesText.fixedToCamera = true;

    // Add sounds
    fireSound = game.add.audio('fire');

    // Enable control and create required states
    control.create(player);

};
// Update game state
function update(){

	// Check for a player control events
	control.update();

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
};

module.exports = playState;
},{"../Classes/Asteroid":1,"../Classes/Explosion":2,"../Classes/Ship":3,"../Classes/Shoot":4,"../Control/Control":5,"../Helper/Functions":9,"../Helper/Globals":10,"../Helper/Init":11,"../Helper/MenuButton":12}],17:[function(require,module,exports){
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
},{"./Helper/Init":11,"./Helper/MenuButton":12,"./States/FinalState":14,"./States/MenuState":15,"./States/PlayState":16}]},{},[17]);
