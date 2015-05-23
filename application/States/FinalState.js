var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var MenuButton = require('../Helper/MenuButton');

var finalState = {
	create: function(){
		var finalText = game.add.bitmapText(GLOBAL.WIDTH / 2, GLOBAL.HEIGHT / 3, 'carrier_command', "You earned: " + GLOBAL.SCORE, 20);
			finalText.anchor.setTo(0.5, 0.5);

		// Add final exit button
		new MenuButton(
			'Try again', // Text
			{x: GLOBAL.WIDTH / 2, y: GLOBAL.HEIGHT * 2 / 3}, // Position
			{x: 3, y: 2}, // Scale
			// Handler
			function(){
				game.state.start('Menu');
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
	},
	update: function(){
		game.sound.volume = GLOBAL.SOUND / 3;
		volumeIcon.animations.frame = GLOBAL.SOUND;
	}
};

module.exports = finalState;