var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');
var TouchButton = require('../Helper/TouchButton');
var Pad = require('../Helper/Pad');


var Touch = function(){

    // Set game properties
    var state = {
        __FORWARD: false,
        __LEFT: false,
        __RIGHT: false,
        __FIRE: false
    };

    var create = function(player){

        var fireButton = new TouchButton(
            {
                x: GLOBAL.WIDTH - 60,
                y: GLOBAL.HEIGHT - 60
            }, 5, 5, function(){player.fire()}, 1, 1);

        var exitButton = new TouchButton({
                x: 60,
                y: 60
            }, 9, 9, function(){
                game.state.start('Final');
            }, 1, 1);

        new Pad({x: 60, y: GLOBAL.HEIGHT - 60}, state);

    };

    var update = function(){

        if(state.__RIGHT){
            player.turnRight();
        } else if (state.__LEFT) {
            player.turnLeft();
        }
        if(state.__FORWARD){
            player.moveForward();
        } else {
            player.stopMoving();
        }

        // Fire
        if(state.__FIRE){
            player.fire();
        };
    };

    var preload = function(){
        // Preload buttons
        game.load.spritesheet('gamepad', 'resourses/images/xbox360.png', 102.4, 102.5);
        game.load.spritesheet('stick', 'resourses/images/xbox360.png', 34.13, 34.16);
    };

    return {
        preload: preload,
        create: create,
        update: update
    };
};

module.exports = Touch;