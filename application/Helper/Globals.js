var GLOBAL = {
	WIDTH: window.innerWidth - 20,
	HEIGHT: window.innerHeight - 20,
	LEVEL: 5,
	COMPLEXITY: 3,
	SHOOTS: [],
	ROCKS: [],
	LAST_SHOOT : new Date().getTime() / 1000,
	SCORE: 0,
	SOUND: 3
};

module.exports = GLOBAL;