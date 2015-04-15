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
		game.load.spritesheet('volume', 'resourses/images/volume.png', 25, 25);
	},
	create: function(){

		// Add soundtrack
		var soundtrack = game.add.audio('soundtrack');
			soundtrack.play();

		// Create logo and set its position
		var logo = game.add.sprite(GLOBAL.WIDTH / 2, GLOBAL.HEIGHT / 4, 'logo');
			logo.scale.setTo(0.25, 0.25);
			logo.anchor.setTo(0.5, 0.5);

		// Create menu
		var start = new MenuButton(
				'Play', // Text
				{x: GLOBAL.WIDTH / 2, y: GLOBAL.HEIGHT / 3 + 100}, // Position
				{x: 3, y: 2}, // Scale
				// Handler
				function(){
					game.state.states.Menu.state.pause()
					game.state.start('Game');
				}
			);

		// Add volume button and volume icon
		var volumeButton = new MenuButton(
				'', // Text
				{x: 50, y: 50}, // Scale
				{x: 0.8, y: 1.5}, // Position
				// Handler
				function(){
					if(!(GLOBAL.SOUND)){
						GLOBAL.SOUND = 3;
					} else {
						GLOBAL.SOUND--;
					};
				}
			);
		volumeIcon = game.add.sprite(50, 50, 'volume');
			volumeIcon.anchor.setTo(0.5, 0.5);
			volumeIcon.scale.setTo(2, 2);
			// volumeIcon.animations.frame = 3;

		var text = "To accelerate use 'W'\n\n" + "To counter-clockwise use 'A'\n\n" + "To clockwise use 'D'\n\n" + "To shoot use 'Space'"
		var hintText = game.add.bitmapText(GLOBAL.WIDTH / 2 + 50, GLOBAL.HEIGHT * 3 / 4,
				'carrier_command', text, 20);
			hintText.anchor.setTo(0.5, 0.5);
	},
	update: function(){
		game.sound.volume = GLOBAL.SOUND / 3;
		volumeIcon.animations.frame = GLOBAL.SOUND;
	},
	shutdown: function(game){
		// Stop playing soundtrack on shutdown
		game.sound.stopAll();
	}
};

module.exports = menuState;