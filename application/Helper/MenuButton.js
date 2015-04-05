var game = require('./Init');

var MenuButton = function(text, position, clickHandler){
	// Create button object
	button = game.add.sprite(position.x, position.y, 'button');
	button.anchor.setTo(0.5, 0.5);
	button.scale.setTo(3, 2);
	button.animations.add('clicked', null, 10, false, false);
	button.inputEnabled = true;

	// Write text
	buttonText = game.add.bitmapText(position.x, position.y, 'carrier_command', text, 20);
	buttonText.anchor.setTo(0.5, 0.5);

	// Set handlers
	button.events.onInputDown.add(function(){
		button.animations.next(1);
	}, this);
	button.events.onInputUp.add(function(){
		button.animations.previous(1);
		if(clickHandler){
			clickHandler();
		};
	}, this);

	button.remove = function(){
		button.destroy();
		buttonText.destroy();
	};

	return button;
};

module.exports = MenuButton;