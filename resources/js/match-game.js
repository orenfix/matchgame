var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
	$('button.board-level').click(function() {
		MatchGame.boardLevel($('#game'),($(this).attr('id')));
	});
	MatchGame.boardLevel($('#game'),'beginner');
});


/*
Obtain selected board level or start with Beginner level as default.
Pass level to other functions.
*/

MatchGame.boardLevel = function ($game,$level) {
	$game.data('moveCounter',0);
	$('#game').removeClass('gameOver');
	$('p.board-level').html("Choose a level:");
	$('.move-counter').html('');
	if ( $level == 'beginner' ) {
			$level = 8;
			$('#beginner').addClass('selected');
			$('#advanced').removeClass('selected');
		} else if ( $level == 'advanced' ) {
			$level = 18;
			$('#advanced').addClass('selected');
			$('#beginner').removeClass('selected');
		} else {
			$level = 8;
			$('#beginner').addClass('selected');
			$('#advanced').removeClass('selected');
		}

	MatchGame.renderCards(MatchGame.generateCardValues($level),$('#game'),$level);
};


/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function ($level) {
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

MatchGame.renderCards = function(cardValues, $game, $level) {
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
		'hsl(360,85%,65%)',
		'hsl(25,45%,65%)',
		'hsl(55,45%,65%)',
		'hsl(90,45%,65%)',
		'hsl(160,45%,65%)',
		'hsl(220,45%,65%)',
		'hsl(265,45%,65%)',
		'hsl(310,45%,65%)',
		'hsl(360,45%,65%)',
		'hsl(25,85%,35%)',
		'hsl(55,85%,35%)'
	];

	$game.html('');
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
			MatchGame.flipCard($(this), $game, $level);
		});
		$('.popout').click(function() {
			MatchGame.popOut();
		});
		$('.popin').click(function() {
			MatchGame.popIn();
		});
	}
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game, $level) {
	var $flippedCards = $game.data('flippedCards');
	var $gameFlippedCards = $game.data('gameFlippedCards');

	if ( $card.data('flipped') == true ) {
		return;
	} else {
		var moveCounter = $game.data('moveCounter');
		$game.data('moveCounter',(moveCounter+1));
		moveCounter = $game.data('moveCounter');
		$('.move-counter').html('Moves: ' + moveCounter);
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
			$('.card').off('click');
			setTimeout(function() {
				$flippedCards[0].html('').css('background-color','rgb(32,64,86)').data('flipped',false);
				$flippedCards[1].html('').css('background-color','rgb(32,64,86)').data('flipped',false);
				$flippedCards.length = 0;
				$('.card').click(function() {
					MatchGame.flipCard($(this), $game, $level);
				});
			},450);
		}
	} else return;
};

/*
This function runs when the game is over
*/

MatchGame.gameOver = function() {
	$('#game').addClass('gameOver');
	$('.card').off('click');
	$('p.board-level').html("Play again? <br> Choose a level:");
};

/*
Functions to pop-out/pop-in the game board
*/
MatchGame.popOut = function() {
	window.open('popout.html','MatchGame','width=600,height=600,top=50,left=300');
}

MatchGame.popIn = function() {
	window.opener.focus();
	window.close();
}










