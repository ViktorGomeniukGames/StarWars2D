// var game = require('../Helper/Init');
// var GLOBAL = require('../Helper/Globals');
// var Shoot = require('../Classes/Shoot');
var Keyboard = require('./Keyboard');
var Gamepad = require('./Gamepad');


var CONTROLS = function(player){
	var controlMethod = new Keyboard(player);
    // Gamepad(player);
    return {
    	update: controlMethod.update
    };
};

module.exports = CONTROLS;