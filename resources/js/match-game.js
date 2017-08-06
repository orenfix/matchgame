$(document).ready(function() {
	MatchGame.renderCards(MatchGame.generateCardValues(),$('#game'));
});

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
	var values = [];
	for ( i = 1; i < 9; i++ ) {
		values.push(i,i);
	}
	
	var random = [];
	while ( values.length > 0 ) {
		var index = Math.floor(Math.random() * values.length);
		random.push(values[index]);
		values.splice(index,1);
	}
	return random;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
	cardColors = [
		'hsl(25,85%,65%)',
		'hsl(55,85%,65%)',
		'hsl(90,85%,65%)',
		'hsl(160,85%,65%)',
		'hsl(220,85%,65%)',
		'hsl(265,,85%,65%)',
		'hsl(310,85%,65%)',
		'hsl(360,85%,65%)'
	];
	$game.html('');
	for ( x = 0; x < cardValues.length; x++ ) {
		var $card = $("<div class='card col-xs-3'></div>");
		$card.data('value',cardValues[x]);
		$card.data('flipped',false);
		$card.data('color',cardColors[cardValues[x]-1]);
		$game.append($card);
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

};
