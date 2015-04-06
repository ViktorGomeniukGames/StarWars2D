var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');
var Shoot = require('../Classes/Shoot');


var Keyboard = function(player){

    var update = function(){
        console.log('here');
        // Set player's control combo
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            player.animations.next(1);
            game.physics.arcade.velocityFromAngle(player.angle, 200, player.body.velocity);
        } else {
            player.animations.previous(1);
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            player.rotation -= 0.05;
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.rotation += 0.05;
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            // Fire with some timeout
            var fire = new Date().getTime() / 1000;
            if((fire - GLOBAL.LAST_SHOOT) > 0.25){
                GLOBAL.LAST_SHOOT = fire;
                GLOBAL.SHOOTS.push(new Shoot());
                fireSound.play();
            };
        };

        // Add handler for escape key
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            game.state.start('Final');
        };
    };

    return {
        update: update
    };
};

module.exports = Keyboard;