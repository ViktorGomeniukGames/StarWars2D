var game = require('./Init');
var Explosion = require('../Classes/Explosion');
var GLOBAL = require('./Globals');


function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function collideObjects(firstObject, secondObject){
	if(firstObject.key == "shoot"){
		GLOBAL.SCORE += 1;
	};
	var explosionPosition = {
		x: (firstObject.x + secondObject.x) / 2,
		y: (firstObject.y + secondObject.y) / 2
	};
	explosionSound = game.add.audio('explosion');
	var explosion = new Explosion(explosionPosition.x, explosionPosition.y);
	explosion.play();
	firstObject.desapear();
	secondObject.desapear();
};

var Functions = {
	getRandomInt: getRandomInt,
	collideObjects: collideObjects
};

module.exports = Functions;