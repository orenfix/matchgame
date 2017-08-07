$(document).ready(function() {
	MatchGame.renderCards(MatchGame.generateCardValues($('#game')),$('#game'));
});

var MatchGame = {};
var moveCounter = 0;

MatchGame.boardLevel = function (level) {
	if ( level == 'beginner' ) {
			$level = 8;
//			moveCounter = 0;
//			$('.move-counter').html('Moves: ' + moveCounter);
//			MatchGame.renderCards(MatchGame.generateCardValues($('#game')),$('#game'));
			alert('New feature coming coon!');
		} else if ( level == 'advanced' ) {
			$level = 18;
			alert('Advanced level coming soon!');
		}
}

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function ($game) {
	$game.data('level',8);
	var $level = $game.data('level');
	$('.board-level').click(function () {
		var level = $(this).attr('id');
		MatchGame.boardLevel(level);
	});


	var values = [];
	for ( i = 1; i <= $level; i++ ) {
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
	$game.data('flippedCards',[]);
	$game.data('gameFlippedCards',[]);

	cardColors = [
		'hsl(25,85%,65%)',
		'hsl(55,85%,65%)',
		'hsl(90,85%,65%)',
		'hsl(160,85%,65%)',
		'hsl(220,85%,65%)',
		'hsl(265,85%,65%)',
		'hsl(310,85%,65%)',
		'hsl(360,85%,65%)'
	];

	$game.html('');
	var $level = $game.data('level');
	for ( x = 0; x < cardValues.length; x++ ) {
		if ( $level == 8 ) { var $card = $("<div class='card col-xs-3'></div>"); }
		if ( $level == 18 ) { var $card = $("<div class='card col-xs-2'></div>"); }
		$card.data('value',cardValues[x]);
		$card.data('flipped',false);
		$card.data('color',cardColors[cardValues[x]-1]);
		$game.append($card);
		if ( $level == 8 ) { $('.card').css('height','200px'); }
		if ( $level == 18 ) { $('.card').css('height','140px'); }
		$card.click(function() {
			MatchGame.flipCard($(this),$game);
		});
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
	var $flippedCards = $game.data('flippedCards');
	var $gameFlippedCards = $game.data('gameFlippedCards');
	var $level = $game.data('level');
	moveCounter++;
	$('.move-counter').html('Moves: ' + moveCounter);

	if ( $card.data('flipped') == true ) {
		return;
	} else {
		$card.css('background-color',$card.data('color'));
		$card.append($card.data('value'));
		$card.data('flipped',true);
		$flippedCards.push($card);
	}

	if ( $flippedCards.length == 2 ) {
		if ( $flippedCards[0].data('value') == $flippedCards[1].data('value') ) {
			$flippedCards[0].css('background-color','rgb(153,153,153)').css('color','rgb(204,204,204)');
			$flippedCards[1].css('background-color','rgb(153,153,153)').css('color','rgb(204,204,204)');
			$flippedCards.length = 0;
			$gameFlippedCards.push($card[0],$card[1]);
			if ($gameFlippedCards.length == $level*2 ) {
				MatchGame.gameOver();
			}
		} else {
			setTimeout(function() {
				$flippedCards[0].html('').css('background-color','rgb(32,64,86)').data('flipped',false);
				$flippedCards[1].html('').css('background-color','rgb(32,64,86)').data('flipped',false);
				$flippedCards.length = 0;
			},450);
		}
	} else return;
};

MatchGame.gameOver = function() {
	$('#game').addClass('gameOver');
	$('.card').off('click');
	$('.instructions').append("<button class='play-again'>Play Again?</button>");
	$('.play-again').click(function() {
		location.reload();
	});
};










