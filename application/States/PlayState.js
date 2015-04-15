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

// Create control manager
control = new CONTROLS();

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