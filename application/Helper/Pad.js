var game = require('./Init');


var Pad = function(startPosition, context){

	// Set center of pad
	var center = game.add.button(startPosition.x, startPosition.y, 'stick', null, this, 70, 70, 70, 70);
		center.fixedToCamera = true;
		center.anchor.setTo(0.5, 0.5);

	// Set left side
	var centerLeft = game.add.button(startPosition.x - 34.13, startPosition.y, 'stick', null, this, 111, 69, 111, 69);
		centerLeft.fixedToCamera = true;
		centerLeft.anchor.setTo(0.5, 0.5);

		leftActionStart = function(){
            center.animations.frame = 112;
            context.__LEFT = true;
        };
        leftActionStop = function(){
			center.animations.frame = 70;
			context.__LEFT = false;
		};
        // Set handlers
        centerLeft.events.onInputDown.add(leftActionStart, this);
		centerLeft.events.onInputUp.add(leftActionStop, this);
		centerLeft.events.onInputOver.add(leftActionStart, this);
		centerLeft.events.onInputOut.add(leftActionStop, this);

	// Set right side
	var centerRight = game.add.button(startPosition.x + 34.13, startPosition.y, 'stick', null, this, 68, 71, 68, 71);
		centerRight.fixedToCamera = true;
		centerRight.anchor.setTo(0.5, 0.5);

		rightActionStart = function(){
            center.animations.frame = 67;
            context.__RIGHT = true;
        };
        rightActionStop = function(){
			center.animations.frame = 70;
			context.__RIGHT = false;
		};
		// Set handlers
        centerRight.events.onInputDown.add(rightActionStart, this);
		centerRight.events.onInputUp.add(rightActionStop, this);
		centerRight.events.onInputOver.add(rightActionStart, this);
		centerRight.events.onInputOut.add(rightActionStop, this);

	// Set top side
	var top = game.add.button(startPosition.x, startPosition.y - 34.16, 'stick', null, this, 13, 55, 13, 55);
		top.fixedToCamera = true;
		top.anchor.setTo(0.5, 0.5);

		topActionStart = function(){
            center.animations.frame = 28;
            context.__FORWARD = true;
        };
        topActionStop = function(){
			center.animations.frame = 70;
			context.__FORWARD = false;
		};
		// Set handlers
        top.events.onInputDown.add(topActionStart, this);
		top.events.onInputUp.add(topActionStop, this);
		top.events.onInputOver.add(topActionStart, this);
		top.events.onInputOut.add(topActionStop, this);

	// Set bottom side
	var bottom = game.add.button(startPosition.x, startPosition.y + 34.16, 'stick', null, this, 172, 85, 172, 85);
		bottom.fixedToCamera = true;
		bottom.anchor.setTo(0.5, 0.5);

		bottomActionStart = function(){
            center.animations.frame = 157;
        };
        bottomActionStop = function(){
			center.animations.frame = 70;
		};
		// Set handlers
        bottom.events.onInputDown.add(bottomActionStart, this);
		bottom.events.onInputUp.add(bottomActionStop, this);
		bottom.events.onInputOver.add(bottomActionStart, this);
		bottom.events.onInputOut.add(bottomActionStop, this);

	// Add unused sides
	var topLeft = game.add.button(startPosition.x - 34.13, startPosition.y - 34.16, 'stick', null, this, 54, 54, 54, 54);
		topLeft.fixedToCamera = true;
		topLeft.anchor.setTo(0.5, 0.5);

	var bottomLeft = game.add.button(startPosition.x - 34.13, startPosition.y + 34.16, 'stick', null, this, 84, 84, 84, 84);
		bottomLeft.fixedToCamera = true;
		bottomLeft.anchor.setTo(0.5, 0.5);

	var topRight = game.add.button(startPosition.x + 34.13, startPosition.y - 34.16, 'stick', null, this, 56, 56, 56, 56);
		topRight.fixedToCamera = true;
		topRight.anchor.setTo(0.5, 0.5);

	var bottomRight = game.add.button(startPosition.x + 34.13, startPosition.y + 34.16, 'stick', null, this, 86, 86, 86, 86);
		bottomRight.fixedToCamera = true;
		bottomRight.anchor.setTo(0.5, 0.5);

	// var pad = [
 //    	topLeft,
 //    	top,
 //    	topRight,
 //    	centerLeft,
 //    	center,
 //    	centerRight,
 //    	bottomLeft,
 //    	bottom,
 //    	bottomRight
 //    ];

    return true;
};

module.exports = Pad;