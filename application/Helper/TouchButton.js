var game = require('./Init');

var TouchButton = function(position, startFrame, animFrame, clickHandler){

    var button = game.add.sprite(position.x, position.y, 'gamepad');
    	button.animations.add('clicked', frames, 10, false, false);
    	button.animations.frame = startFrame;
        button.anchor.setTo(0.5, 0.5);
        button.inputEnabled = true;
        button.fixedToCamera = true;

        // Set handlers
        button.events.onInputDown.add(function(){
            button.animations.frame = animFrame;
            if(clickHandler){
            	clickHandler(arguments[0], arguments[1]);
            };
        }, this);
		button.events.onInputUp.add(function(){
			button.animations.frame = startFrame;
		}, this);

    return button;
};

module.exports = TouchButton;