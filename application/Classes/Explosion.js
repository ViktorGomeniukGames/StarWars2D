var game = require('../Helper/Init');


function Explosion(positionX, positionY){

	// Add sounds
	explosionSound = game.add.audio('explosionSound');

	var explosion = game.add.sprite(positionX, positionY, 'explosion');
	explosion.anchor.setTo(0.5, 0.5);
	explosion.animations.add('fire', null);
	explosion.play = function(){
		explosion.animations.play('fire', 60, false, true);
		explosionSound.play();
	};
	return explosion;
};

module.exports = Explosion;