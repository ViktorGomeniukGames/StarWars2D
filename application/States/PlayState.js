// Load helper functions and modules
var game = require('../Helper/Init');
var MenuButton = require('../Helper/MenuButton');
var GLOBAL = require('../Helper/Globals');
var getRandomInt = require('../Helper/Functions').getRandomInt;
var collideObjects = require('../Helper/Functions').collideObjects;
var CONTROLS = require('../Control/Main');

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

    // Preload buttons
    game.load.spritesheet('horizontalButton', 'resourses/images/joystick/horizontal.png', 64, 64);
    game.load.spritesheet('verticalButton', 'resourses/images/joystick/vertical.png', 96, 64);
    game.load.spritesheet('diagonalButton', 'resourses/images/joystick/diagonal.png', 64, 64);
    game.load.spritesheet('fireButton', 'resourses/images/joystick/round.png', 96, 96);
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
	// var background = game.add.sprite(0, 0, 'firstBackgroundLayer');
	game.stage.backgroundColor = '#ffffff';

	// Create and configure player
	player = new Ship();

    // Add proper text output
	scoreText = game.add.bitmapText(10, 10, 'carrier_command', 'Score: ' + GLOBAL.SCORE, 20);
	scoreText.update = function(){
		scoreText.text = 'Score: ' + GLOBAL.SCORE;
	}
	scoreText.anchor.setTo(0, 0);
	livesText = game.add.bitmapText(10, 30, 'carrier_command', 'Lives: ' + player.life, 20);
	livesText.update = function(){
		livesText.text = 'Lives: ' + player.life;
	}

    // Add sounds
    fireSound = game.add.audio('fire');

    // Enable control
    control = new CONTROLS(player);







    // Set game properties
    var __FORWARD = false;
    var __LEFT = false;
    var __RIGHT = false;
    var __FIRE = false;

    // Create virtual fire button
    var fireButton = game.add.button(600, 500, 'fireButton', null, this, 0, 1, 0, 1);
        fireButton.fixedToCamera = true;
        fireButton.events.onInputOver.add(function(){__FIRE = true;});
        fireButton.events.onInputOut.add(function(){__FIRE = false;});
        fireButton.events.onInputDown.add(function(){__FIRE = true;});
        fireButton.events.onInputUp.add(function(){__FIRE = false;});

    // Create button for rotating left
    var leftButton = game.add.button(0, 472, 'horizontalButton', null, this, 0, 1, 0, 1);
        leftButton.fixedToCamera = true;
        leftButton.events.onInputOver.add(function(){__LEFT = true;});
        leftButton.events.onInputOut.add(function(){__LEFT = false;});
        leftButton.events.onInputDown.add(function(){__LEFT = true;});
        leftButton.events.onInputUp.add(function(){__LEFT = false;});

    // Create button for rotating left and moving forward
    var leftDiagonalButton = game.add.button(32, 536, 'diagonalButton', null, this, 6, 4, 6, 4);
        leftDiagonalButton.fixedToCamera = true;
        leftDiagonalButton.events.onInputOver.add(function(){__LEFT = true; __FORWARD = true;});
        leftDiagonalButton.events.onInputOut.add(function(){__LEFT = false; __FORWARD = false;});
        leftDiagonalButton.events.onInputDown.add(function(){__LEFT = true; __FORWARD = true;});
        leftDiagonalButton.events.onInputUp.add(function(){__LEFT = false; __FORWARD = false;});

    // Create button for moving forward
    var forwardButton = game.add.button(160, 472, 'horizontalButton', null, this, 0, 1, 0, 1);
        forwardButton.fixedToCamera = true;
        forwardButton.events.onInputOver.add(function(){__RIGHT = true;});
        forwardButton.events.onInputOut.add(function(){__RIGHT = false;});
        forwardButton.events.onInputDown.add(function(){__RIGHT = true;});
        forwardButton.events.onInputUp.add(function(){__RIGHT = false;});

    // Create button for rotating right and moving forward
    var rightDiagonalButton = game.add.button(160, 536, 'diagonalButton', null, this, 7, 5, 7, 5);
        rightDiagonalButton.fixedToCamera = true;
        rightDiagonalButton.events.onInputOver.add(function(){__RIGHT = true; __FORWARD = true;});
        rightDiagonalButton.events.onInputOut.add(function(){__RIGHT = false; __FORWARD = false;});
        rightDiagonalButton.events.onInputDown.add(function(){__RIGHT = true; __FORWARD = true;});
        rightDiagonalButton.events.onInputUp.add(function(){__RIGHT = false; __FORWARD = false;});

    // Create button for rotating right
    var rightButton = game.add.button(96, 536, 'verticalButton', null, this, 0, 1, 0, 1);
        rightButton.fixedToCamera = true;
        rightButton.events.onInputOver.add(function(){__FORWARD = true;});
        rightButton.events.onInputOut.add(function(){__FORWARD = false;});
        rightButton.events.onInputDown.add(function(){__FORWARD = true;});
        rightButton.events.onInputUp.add(function(){__FORWARD = false;});




};
// Update game state
function update(){

	// Set player's physic
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    player.body.angularVelocity = 0;

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