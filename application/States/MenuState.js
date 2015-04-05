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