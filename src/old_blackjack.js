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



// Card Constructor
function Card(suit, rank) {
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



//This will shuffle the deck and ensure they are all stacked together (topCard = 0)
deck.sort(function() {return 0.5 - Math.random()});
var topCard = 0;

//Deal 2 cards to each player and the dealer (computer) in order.
function deal() {
	for (i=0; i<2; i++) {
    	for (j=0; j < players.length; j++) {
        	players[j].hand.push(deck[topCard]);
        	topCard++;
        }
    }
}

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



function playAsUser() { 
    var userHand = new Hand();
    var decision = false;
    do { 
        decision = confirm("Your hand is "+ userHand.printHand() + " \rYour current score is " + userHand.score() + ".\r\rOK to hit or Cancel to stand");
        if (decision === true) {
        	userHand.hitMe();	
        } else {
        	break;
        }
    } while(decision && userHand.score() <=21)  
    return userHand;     
}; 

var playAsDealer = function() {
    var dealerHand = new Hand();
    while (dealerHand.score() < 17) {
        dealerHand.hitMe();
    }
    return dealerHand;
}

function declareWinner(player,computer) {
    var userScore = player.score();
    var dealerScore = computer.score();
    
    if (userScore > 21) {
        if (dealerScore > 21) {
            return "You tied!" /*\r\rYour score: " + userScore + "\rComputer: " + dealerScore*/;
        } else {
            return "You lose!" /*\r\rYour score: " + userScore + "\rComputer: " + dealerScore*/;
        }
    } else if (dealerScore > 21) {
    /*    if (userScore === 21) {
            return "Blackjack! You win! \r\rYour score: " + userScore + "\rComputer: " + dealerScore;
        } else {   */
            return "You win!" /*\r\rYour score: " + userScore + "\rComputer: " + dealerScore*/;
     /*   } */
    } else if (userScore === dealerScore) {    
        return "You tied!" /*\r\rYour score: " + userScore + "\rComputer: " + dealerScore*/;
    } else {
        return "You lose!" /*\r\rYour score: " + userScore + "\rComputer: " + dealerScore*/;
    }
}

// Show the hand of the player with the selected parameter. 
function showHand(player) {
    thishand = '';
    num = player;
    // If num isNaN, forces the user to select something else.
    if (isNaN(player) || (num < 0 || num > players.length)) {
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

// Play the game
function playGame() {
    player = playAsUser();
    computer = playAsDealer();
    console.log(declareWinner(player,computer) + " \n\nYour score: " + player.score() + '\n\n' + playAsUser.printHand() + "\nComputer: " + computer.score() + '\n\n');
}

playGame();