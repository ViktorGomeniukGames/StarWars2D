var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Keyboard = require('./Keyboard');
var Gamepad = require('./Gamepad');
var Touch = require('./Touch');


var CONTROLS = function(player){
	if(game.device.touch){
		var controlMethod = new Touch(player);
	} else {
		var controlMethod = new Keyboard(player);
	};
    
    return {
    	preload: controlMethod.preload,
    	create: controlMethod.create,
    	update: controlMethod.update
    };
};

module.exports = CONTROLS;