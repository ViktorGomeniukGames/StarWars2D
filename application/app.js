// Load required modules
var game = require('./Helper/Init');
var MenuButton = require('./Helper/MenuButton');
var menuState = require('./States/MenuState');
var finalState = require('./States/FinalState');
var playState = require('./States/PlayState');

// Add different states to game
game.state.add('Final', finalState);
game.state.add('Game', playState);
game.state.add('Menu', menuState);

// Start game loading menu
game.state.start('Menu');