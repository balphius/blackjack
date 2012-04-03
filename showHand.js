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
    thishand = 'this is the hand (you shouldn\'t see this)';
    num = player;
    // Fixes the proper captialization of player.
    if (isNaN(player)) {
    	player.toTitleCase;
    }
    // Validates the parameter using a do/while (executing the code 
    // and repeating if the condition is not met).
    do {
    	// Determines if the parameter was text or a number
	    if (isNaN(num)) {
	    	var tmpName = ''
	    	for (i=0; i < players.length; i++) {
		    	var tmpName = players[i];
		    	tmpName.toTitleCase();	
				// If there is a match found exit the loop
				if (player === tmpName) {
		    		num = i;
					break;
				}
			}
		// If the player not a number, the program checks to see if none of the 
		// players[i].name attributes match and executes this block if none do.
		} else if ( player !== player[i].name) {
			string = '';		
			for (i=0; i < players.length-1; i++) {
				string += players[i].name + ', ';
			}
			{
				string += 'or ' + players[i].name + '.'
			}

			player = prompt('You didn\'t enter a valid player name. Select one of the following players: \r' + string);
		// If the player is a valid name then run the following code:
		}
    } while (!isNaN(num));
    console.log('Hand belonging to ' + players[num].name + ': ');
 		       
	for (j=0; j < players[num].hand.length-1; j++) {
		thishand += players[num].hand[j].rank + players[num].hand[j].suit + ', ';			
		}
		{
		thishand += players[num].hand[j].rank + players[num].hand[j].suit + '.';			
		}
	console.log(thishand);    
}

