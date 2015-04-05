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