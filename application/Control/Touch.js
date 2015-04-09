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
        var that = this;
        // Create fireButton
        var fireButton = new TouchButton(
            {
                x: GLOBAL.WIDTH - 60,
                y: GLOBAL.HEIGHT - 50
            }, 5, 5, function(){player.fire()});
        // Create exitButton
        var exitButton = new TouchButton({
            x: 60,
            y: 60
        }, 9, 9, function(){
            game.state.start('Final');
        });
        var pad = new TouchButton({
            x: 60, y: 60
        }, 8, 8, padControl);
    };
    var padControl = function(button, point){
        console.log(point);
    };

    var update = function(){
        // player.body.velocity.x = 0;
        // player.body.velocity.y = 0;
        // player.body.angularVelocity = 0;

        // // Moving combo
        // switch(__LEFT, __FORWARD, __RIGHT){
        //     // Rotate left
        //     case true, false, false:
        //         player.rotation -= 0.05;

        //     // Rotate right
        //     case false, false, true:
        //         player.rotation += 0.05;

        //     // Move forward
        //     case false, true, false:
        //         player.animations.next(1);
        //         game.physics.arcade.velocityFromAngle(player.angle, 200, player.body.velocity);

        //     // Otherwise - stop animation and do nothing
        //     default:
        //         player.animations.previous(1);
        //         // player.body.angularVelocity = 0;

        // };
        // // Fire
        // if(__FIRE){
        //     var fire = new Date().getTime() / 1000;
        //     if((fire - GLOBAL.LAST_SHOOT) > 0.25){
        //         GLOBAL.LAST_SHOOT = fire;
        //         GLOBAL.SHOOTS.push(new Shoot());
        //         fireSound.play();
        //     };
        // };
    };

    var preload = function(){
        // // Preload buttons
        // game.load.spritesheet('horizontalButton', 'resourses/images/joystick/horizontal.png', 64, 64);
        // game.load.spritesheet('verticalButton', 'resourses/images/joystick/vertical.png', 96, 64);
        // game.load.spritesheet('diagonalButton', 'resourses/images/joystick/diagonal.png', 64, 64);
        // game.load.spritesheet('fireButton', 'resourses/images/joystick/round.png', 96, 96);
        game.load.spritesheet('gamepad', 'resourses/images/joystick/xbox360.png', 102.4, 102.5);
    };

    return {
        preload: preload,
        create: create,
        update: update
    };
};

module.exports = Touch;