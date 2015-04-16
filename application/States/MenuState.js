var game = require('../Helper/Init');
var MenuButton = require('../Helper/MenuButton');
var GLOBAL = require('../Helper/Globals');
var CONTROLS = require('../Control/Control');



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
					game.state.states.Menu.state.pause();
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

		// Define device type and fit text properly
		if(game.device.touch){
			var text = "To control ship use pad\n\n" + "To shoot use 'X' button"

			// Define screen size
			if(window.innerWidth < 610 || window.innerHeight < 530){
				var size = 10;
				var height = GLOBAL.HEIGHT - 20;
			} else {
				var size = 20;
				var height = GLOBAL.HEIGHT * 3 / 4;
			};
			var hintText = game.add.bitmapText(GLOBAL.WIDTH / 2, height,
				'carrier_command', text, size);
		} else {
			var text = "To accelerate use 'W'\n\n" + "To turn use 'A' and 'D'\n\n" + "To shoot use 'Space'\n\n" + "To exit use ESC"
			var hintText = game.add.bitmapText(GLOBAL.WIDTH / 2 + 50, GLOBAL.HEIGHT * 3 / 4,
				'carrier_command', text, 20);
		};
		hintText.anchor.setTo(0.5, 0.5);

		// Create control manager
		control = new CONTROLS();
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