/**
 * @author kurtis.meister
 */

// Used to correct capitalization of names.  "Borrowed" from another source (not sure which)
String.prototype.toTitleCase = function () {
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|vs?\.?|via)$/i;

  return this.replace(/([^\W_]+[^\s-]*) */g, function (match, p1, index, title) {
    if (index > 0 && index + p1.length !== title.length &&
      p1.search(smallWords) > -1 && title.charAt(index - 2) !== ":" && 
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (p1.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};

// Create the player array, select the number of players, and assign them each names.
// They are all given empty hand[] placeholders for use later.
var players = [];
var numPlayers = prompt('How many human players? (1-5)? ');
    while (isNaN(numPlayers) || numPlayers < 1 || numPlayers > 5) {
    	numPlayers = prompt('Please enter a numeric value between 1 and 5: ');
	}

players.push({'name': 'Dealer', 'hand': []});
for (i=1; i <= numPlayers; i++) {
	var tmpName = prompt('Enter a name for player ' + i + ': ');
	players.push({'name': tmpName, 'hand': []});
}

// List the names of the players.  More of an error checking code to ensure the array
// was set up properly.

function listPlayers() {
	string = '';

	for (i=0; i < players.length-1; i++) {
		string += players[i].name + ', ';
	}
	{
		string += 'and ' + players[i].name + ' are playing.'
	}
	console.log(string);
}

listPlayers();

// Define what is in a deck of cards:
var suits = ['\u2660','\u2663','\u2665','\u2666'];
var ranks = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];

// Card Constructor.  Uses a suit and rank parameter.
function Card(rank, suit) {
    rank = ranks[index];
    suit = suits[index];
    this.getValue = function(){
        if (rank===1){
            return 11;
        } else if (rank>10) {
            return 10;
        } else {
            return rank;
        }
    };
    this.getRank = function(){
        return rank;
    };
    this.getSuit = function(){
        return suit;
    };    
}

// This creates the deck using the Card constructor (assigning 4*13
// cards unique values based on what suits and ranks contain.)
var deck = [];
for (var i=0; i<suits.length; i++) {
    for (var j=0; j<ranks.length; j++) {
        deck.push(new Card({'rank': ranks[j], 'suit':suits[i]}));
    }
}

// This will shuffle the deck and ensure they are all stacked
// together by resetting topCard to 0.
deck.sort(function() {return 0.5 - Math.random()});
var topCard = 0;

// This is the Hand Constructor
function Hand(){
    var hand = [];
    this.getHand = function(){
        return hand;
    };
    // this gets the value of the Hand
    this.score = function(){
        var sum = 0;
        for (var i in hand){
            sum += hand[i].getValue();
        }
        var aces = 0;
        var evaluate = function(){
            if (sum > 21 && aces > 0){
                sum -= 10;
                aces--;
                evaluate();
            }
        };
        for (var a in hand){
            if (hand[a].getValue() === 11){
            aces++;
            }
        evaluate();
        }
        return sum;
    };


    this.printHand = function(){
        string = '';
        for(i=0;i<hand.length-1;i++){
            string+=(ranks[hand[i].getNumber()-1]+ suits[hand[i].getSuit()-1]+", ");
        }
        {
            string+=("and " + ranks[hand[i].getNumber()-1] + suits[hand[i].getSuit()-1]+".");
        }
        return(string)
    };
    this.hitMe = function() {
        hand.push(deal());
    }
}

// Deal 2 cards to each player and a single card to the computer
// after the first set has been dealt.
// Each player (except the dealer) receives their second card
// after the first series. 

function deal() {
    var dealer = false;
    for (j=1; j < players.length; j++) {
        for (i=0; i<2; i++) {
            var card = deck[topCard];
            players[j].hand.push(card);
            topCard++;
            // The dealer is hard coded to player 0
            if (j === (players.length-1) && dealer) {
                players[0].hand.push(card);
                dealer = true;
                topCard++;
            }
        }
    }
}

deal();

// Show those two cards to each player
// Do not show the dealers hand.

function showAllHands() {
    for (i=1; i < players.length; i++) {
        showHand(i);
    }
}

function showHand(player) {
    thishand = '';
    num = player;
    // If num isNaN, forces the user to select something else.
    if (isNaN(player) || (num < 1 || num > players.length)) {
       	num = prompt('That was not a valid number. \r\rPlease enter a player number between 1 and ' + players.length-1 + ' or choose 0 for the dealer hand.'); 
   		if (false) {
   			return -1;
   		}   		
    }
    console.log('Hand belonging to ' + players[num].name + ': ');
    
    //Displays all the cards in the hand.
	for (j=0; j < players[num].hand.length-1; j++) {
		thishand += players[num].hand[j].rank + players[num].hand[j].suit + ', ';			
		}
		{
		thishand += players[num].hand[j].rank + players[num].hand[j].suit + '.';			
		}
	console.log(thishand);    
}

showAllHands()

// Manually scripted version of showing Player 1's hand
player[1]

// Player 1-5 goes first, dealer goes last.  Player 1-5
// can choose whether to hit or stand each time their
// turn comes, and the dealer must adhere to blackjack
// rules.


// If a player busts while hitting 