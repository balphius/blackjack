/**
 * @author kurtis.meister
 */

// This assigns our players.  player[0] will be the dealer/computer.

var players = [];
var numPlayers = prompt('How many human players? (1-5)? ');
    while (numPlayers < 0 || numPlayers > 5) {
    	numPlayers = prompt('Please enter a numeric value between 1 and 5: ');
	}

players.push({'name': 'Dealer', 'hand': []});
for (i=1; i <= numPlayers; i++) {
	var tmpName = prompt('Enter a name for player ' + i + ': ');
	players.push({'name': tmpName, 'hand': []});
}

// List the names of the players:

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
//console.log(players[0].name + ', ' + players[1].name + ', ' + players[2].name + '.');

// This creates the deck and assigns the relevant rank and suit in an associative array.
var suits = ['\u2660','\u2663','\u2665','\u2666'];
var ranks = ['A',2,3,4,5,6,7,8,9,10,'J','Q','K'];
var deck = [];
for (var i=0; i<suits.length; i++) {
    for (var j=0; j<ranks.length; j++) {
        var card = {'rank': ranks[j], 'suit':suits[i]};
        deck.push(card);
    }
}

//This will shuffle the deck and ensure they are all stacked together (topCard = 0)
deck.sort(function() {return 0.5 - Math.random()});
var topCard = 0;


//Deal 2 cards to each player and the dealer (computer) in order.
for (i=0; i<2; i++) {
    for (j=0; j < players.length; j++) {
        var card = deck[topCard];
        players[j].hand.push(card);
        topCard++;
        
        // console.log(players[j].name + ' was dealt a ' + deck[topCard].rank + deck[topCard].suit);
    }
}

// Summarize all hands to the players

function showAllHands() {
    for (i=0; i < players.length; i++) {
        showHand(i);
    }
}

// Shows a specific hand for a player based on name or number

function showHand(player) {
    thishand = '';
    num = player;
    
    while (isNaN(player)) {
        string = '';
        for (i=0; i < players.length; i++) {
            string += players[i] + ' for ' + players[i].name + '\r';
        }
        num = prompt('Enter a player number. \r' + string);
    }

    console.log('Hand belonging to ' + players[num].name + ': ');
    
    for (j=0; j < players[num].hand.length-1; j++) {
    	thishand += players[num].hand[j].rank + players[num].hand[j].suit + ', ';			
    	}
    	{
    		thishand += players[num].hand[j].rank + players[num].hand[j].suit + '.';			
    	}
    console.log(thishand);
}

showAllHands();