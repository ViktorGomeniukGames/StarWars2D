var GLOBAL = {
	WIDTH: window.innerWidth - 20,
	HEIGHT: window.innerHeight - 20,
	LEVEL: 1,
	COMPLEXITY: 3,
	SHOOTS: [],
	ROCKS: [],
	LAST_SHOOT : new Date().getTime() / 1000,
	SCORE: 0
};

module.exports = GLOBAL;