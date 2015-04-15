var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');
var TouchButton = require('../Helper/TouchButton');


var Touch = function(){

    // Set game properties
    var __FORWARD = false;
    var __LEFT = false;
    var __RIGHT = false;
    var __FIRE = false;

    var create = function(player){

        var fireButton = new TouchButton(
            {
                x: GLOBAL.WIDTH - 60,
                y: GLOBAL.HEIGHT - 50
            }, 5, 5, function(){player.fire()}, 1, 1);
        // Create exitButton
        var exitButton = new TouchButton({
                x: 60,
                y: 60
            }, 9, 9, function(){
                game.state.start('Final');
            }, 1, 1);

    };

    var update = function(){
        // player.body.velocity.x = 0;
        // player.body.velocity.y = 0;
        // player.body.angularVelocity = 0;

        // // Moving combo
        // switch(__LEFT, __FORWARD, __RIGHT){
        //     // Rotate left
        //     case true, false, false:
        //         player.turnLeft();

        //     // Rotate right
        //     case false, false, true:
        //         player.turnRight();

        //     // Move forward
        //     case false, true, false:
        //         player.moveForward();

        //     // Otherwise - stop animation and do nothing
        //     default:
        //         player.stopMoving();

        // };
        // // Fire
        // if(__FIRE){
        //     player.fire();
        // };
    };

    var preload = function(){
        // Preload buttons
        game.load.spritesheet('horizontalButton', 'resourses/joystick/horizontal.png', 64, 64);
        game.load.spritesheet('verticalButton', 'resourses/joystick/vertical.png', 96, 64);
        game.load.spritesheet('diagonalButton', 'resourses/joystick/diagonal.png', 64, 64);
        game.load.spritesheet('fireButton', 'resourses/joystick/round.png', 96, 96);
        game.load.spritesheet('gamepad', 'resourses/joystick/xbox360.png', 102.4, 102.5);
    };

    return {
        preload: preload,
        create: create,
        update: update
    };
};

module.exports = Touch;