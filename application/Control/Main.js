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