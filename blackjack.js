/**
 * @author kurtis.meister
 */

 // Card Constructor
function Card(suit, rank) {
    var suit = suit;
    var rank = rank;
    this.getValue = function(){
        if (rank===1){
            return 11;
        } else if (rank>10) {
            return 10;
        } else {
            return rank;
        }
    };
    this.getNumber = function(){
        return rank;
    };
    this.getSuit = function(){
        return suit;
    };
    
}

// This function deals cards
function deal(){
    var s = Math.floor(Math.random()*4+1);
    var n = Math.floor(Math.random()*13+1);
    return new Card(s,n);
}

// This is the Hand Constructor
function Hand(){
    var hand = [];
    hand.push(deal(),deal());
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
        var suit = ["spades ♠", "clubs ♣", "diamonds ♦", "hearts ♥"];
        var rank = ["ace",2,3,4,5,6,7,8,9,10,"jack","queen","king"];
        string = "";
        for(i=0;i<hand.length-1;i++){
            string+=(rank[hand[i].getNumber()-1]+ " of "+suit[hand[i].getSuit()-1]+", ");
        }
        {
            string+=("and " + rank[hand[i].getNumber()-1] + " of "+suit[hand[i].getSuit()-1]+".");
        }
        return(string)
    };
    this.hitMe = function() {
        hand.push(deal());
    }
}

var playAsUser = function() { 
    var userHand = new Hand(); 
    var decision = confirm("Your hand is "+ userHand.printHand() + " \rYour current score is " + userHand.score() + ".\r\rOK to hit or Cancel to stand"); 
    while(decision && userHand.score() <=21) { 
        userHand.hitMe(); 
        decision = confirm("Your hand is "+ userHand.printHand() + " \rYour current score is " + userHand.score() + ".\r\rOK to hit or Cancel to stand"); 
    } 
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

function playGame() {
    player = playAsUser();
    computer = playAsDealer();
    console.log(declareWinner(player,computer) + " \n\nYour score: " + player.score() + "\nComputer: " + computer.score());
}

playGame();