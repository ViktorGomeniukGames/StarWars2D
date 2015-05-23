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