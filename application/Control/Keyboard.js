var game = require('../Helper/Init');
var GLOBAL = require('../Helper/Globals');


var Keyboard = function(){

    var update = function(){
        // Set player's control combo
        if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
            player.moveForward();
        } else {
            player.stopMoving();
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            player.turnLeft();
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.turnRight();
        };
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
            player.fire();
        };

        // Add handler for escape key
        if (game.input.keyboard.isDown(Phaser.Keyboard.ESC)){
            game.state.start('Final');
        };
    };

    return {
        preload: function(){
            console.log('Nothing to preload');
        },
        update: update,
        create: function(player){
            console.log('Nothing to create');
        }
    };
};

module.exports = Keyboard;