var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');


var Touch = function(){

    // Set game properties
    var __FORWARD = false;
    var __LEFT = false;
    var __RIGHT = false;
    var __FIRE = false;

    var create = function(player){

        var button = game.add.sprite(100, 100, 'gamepad');
            button.anchor.setTo(0.5, 0.5);
            // button.scale.setTo(3, 2);
            button.animations.add('clicked', null, 10, false, false);
            button.inputEnabled = true;
            button.fixedToCamera = true;

            // Set handlers
            button.events.onInputDown.add(function(){
                button.animations.next(1);
            }, this);
            // button.events.onInputUp.add(function(){
            //     button.animations.previous(1);
            //     if(clickHandler){
            //         clickHandler();
            //     };
            // }, this);





        // // Create virtual fire button
        // var fireButton = game.add.button(600, 500, 'fireButton', null, this, 0, 1, 0, 1);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        //     fireButton.fixedToCamera = true;  //our buttons should stay on the same place  
        //     fireButton.events.onInputOver.add(function(){__FIRE = true;});
        //     fireButton.events.onInputOut.add(function(){__FIRE = false;});
        //     fireButton.events.onInputDown.add(function(){__FIRE = true;});
        //     fireButton.events.onInputUp.add(function(){__FIRE = false;});

        // // Create button for rotating left
        // var leftButton = game.add.button(0, 472, 'horizontalButton', null, this, 0, 1, 0, 1);
        //     leftButton.fixedToCamera = true;
        //     leftButton.events.onInputOver.add(function(){__LEFT = true;});
        //     leftButton.events.onInputOut.add(function(){__LEFT = false;});
        //     leftButton.events.onInputDown.add(function(){__LEFT = true;});
        //     leftButton.events.onInputUp.add(function(){__LEFT = false;});

        // // Create button for rotating left and moving forward
        // var leftDiagonalButton = game.add.button(32, 536, 'diagonalButton', null, this, 6, 4, 6, 4);
        //     leftDiagonalButton.fixedToCamera = true;
        //     leftDiagonalButton.events.onInputOver.add(function(){__LEFT = true; __FORWARD = true;});
        //     leftDiagonalButton.events.onInputOut.add(function(){__LEFT = false; __FORWARD = false;});
        //     leftDiagonalButton.events.onInputDown.add(function(){__LEFT = true; __FORWARD = true;});
        //     leftDiagonalButton.events.onInputUp.add(function(){__LEFT = false; __FORWARD = false;});

        // // Create button for moving forward
        // var forwardButton = game.add.button(160, 472, 'horizontalButton', null, this, 0, 1, 0, 1);
        //     forwardButton.fixedToCamera = true;
        //     forwardButton.events.onInputOver.add(function(){__RIGHT = true;});
        //     forwardButton.events.onInputOut.add(function(){__RIGHT = false;});
        //     forwardButton.events.onInputDown.add(function(){__RIGHT = true;});
        //     forwardButton.events.onInputUp.add(function(){__RIGHT = false;});

        // // Create button for rotating right and moving forward
        // var rightDiagonalButton = game.add.button(160, 536, 'diagonalButton', null, this, 7, 5, 7, 5);
        //     rightDiagonalButton.fixedToCamera = true;
        //     rightDiagonalButton.events.onInputOver.add(function(){__RIGHT = true; __FORWARD = true;});
        //     rightDiagonalButton.events.onInputOut.add(function(){__RIGHT = false; __FORWARD = false;});
        //     rightDiagonalButton.events.onInputDown.add(function(){__RIGHT = true; __FORWARD = true;});
        //     rightDiagonalButton.events.onInputUp.add(function(){__RIGHT = false; __FORWARD = false;});

        // // Create button for rotating right
        // var rightButton = game.add.button(96, 536, 'verticalButton', null, this, 0, 1, 0, 1);
        //     rightButton.fixedToCamera = true;
        //     rightButton.events.onInputOver.add(function(){__FORWARD = true;});
        //     rightButton.events.onInputOut.add(function(){__FORWARD = false;});
        //     rightButton.events.onInputDown.add(function(){__FORWARD = true;});
        //     rightButton.events.onInputUp.add(function(){__FORWARD = false;});

    };

    var update = function(){

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        player.body.angularVelocity = 0;

        // Moving combo
        switch(__LEFT, __FORWARD, __RIGHT){
            // Rotate left
            case true, false, false:
                player.rotation -= 0.05;

            // Rotate right
            case false, false, true:
                player.rotation += 0.05;

            // Move forward
            case false, true, false:
                player.animations.next(1);
                game.physics.arcade.velocityFromAngle(player.angle, 200, player.body.velocity);

            // Otherwise - stop animation and do nothing
            default:
                player.animations.previous(1);
                // player.body.angularVelocity = 0;

        };
        // Fire
        if(__FIRE){
            var fire = new Date().getTime() / 1000;
            if((fire - GLOBAL.LAST_SHOOT) > 0.25){
                GLOBAL.LAST_SHOOT = fire;
                GLOBAL.SHOOTS.push(new Shoot());
                fireSound.play();
            };
        };
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