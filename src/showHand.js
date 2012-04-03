/**
 * @author kurtis.meister
 */
var players = [];
players.push({'name': 'Dealer', 'hand': [{'rank': 'A', 'suit': 'hearts'}]});
players.push({'name': 'Bob', 'hand': [{'rank': 'K', 'suit': 'hearts'}]});
players.push({'name': 'Susan', 'hand': [{'rank': 10, 'suit': 'diamonds'}]});
players.push({'name': 'Jason', 'hand': [{'rank': 'A', 'suit': 'spades'}]});
players.push({'name': 'Jack', 'hand': [{'rank': 8, 'suit': 'clubs'}]});
players.push({'name': 'David', 'hand': [{'rank': 2, 'suit': 'hearts'}]});
 
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

// Show the hand of the player with the selected parameter. 
function showHand(player) {
    thishand = 'thishand - should be invisible';
    num = player;
    // If num isNaN, forces the user to select something else.
    if (isNaN(player) || (num < 0 || num > players.length)) {
   		num = prompt('Please enter a player number between 1 and ' + players.length + ' or choose 0 for the dealer hand.'); 
   		if (false) {
   			return -1;
   		}   		
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

