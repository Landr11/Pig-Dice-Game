/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, skip, goal;
//initialize the game
init();
function getSum(total, num) {
  return total + num;
}

function checkScore(score) {
  return score > 1;
}

document.querySelector(".btn-roll").addEventListener("click", function() {
  //1 Add a random number // result of the dice roll
  var dice1 = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;
  var dice = dice1 + dice2;
  skip.push(dice1);
  skip.push(dice2);
  skip.splice(0, 2);
  console.log(skip);
  console.log(skip.reduce(getSum));

  if (gamePlaying) {
    //Steps to Take once the button is clicked

    // 2 Display the result
    var diceDOM1 = document.querySelector("#dice1");
    var diceDOM2 = document.querySelector("#dice2");
    //set the display of the dice to visible
    diceDOM1.style.display = "block";
    diceDOM2.style.display = "block";
    //change the image to reflect the result of the dice roll
    diceDOM1.src = "./img/dice-" + dice1 + ".png";
    diceDOM2.src = "./img/dice-" + dice2 + ".png";

    //Update the round score IF the rolled number was not 1
    if (dice !== 2 && skip.reduce(getSum) !== 12 && skip.every(checkScore)) {
      //add score to roundscore variable
      roundScore += dice;
      //then change/display the score on the webpage
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else if (skip.reduce(getSum) === 12) {
      //reset the player score
      scores[activePlayer] = 0;
      //Update the UI to display the reset score score
      document.querySelector("#score-" + activePlayer).textContent =
        scores[activePlayer];
      nextPlayer();
    } else if (dice === 2) {
      nextPlayer();
    } else {
      //reset round score
      roundScore = 0;
      //Update the UI to display the reset score score
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    //Set the Goal to reach score
    var winscore = document.getElementById("goalInput").value;
    //Add CURRENT score to the GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI to display the score
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //Check if the goal Score has been entered if not default goal score is 100
    if (winscore) {
      goal = winscore;
    } else {
      goal = 100;
    }

    //check if the current player has won
    if (scores[activePlayer] >= goal) {
      //display the winner text on the webpage
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      //Move to the next Player by calling the nextPlayer function
      nextPlayer();
    }
  }
});

function nextPlayer() {
  //next players turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  //resetting the score
  roundScore = 0;
  //resetting skip score
  skip = [0, 0];

  //resetting the score on the webpage
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //move the grey background to the current player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.querySelector(".playe-0-panel").classList.remove("active");
  //document.querySelector(".playe-1-panel").classList.add("active");

  // remove the dice image
  document.querySelector("#dice1").style.display = "none";
  document.querySelector("#dice2").style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  skip = [0, 0];
  //goal = 0;

  //Set the display of the dice to none at the start of the game
  document.querySelector("#dice1").style.display = "none";
  document.querySelector("#dice2").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("goalInput").value = "Set Score";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}

//example setter querySelector
//document.querySelector('#current-' + activePlayer).textContent = dice;
// Changing inner HTML document.querySelector("#current-" + activePlatyer).innerHTML = "<em>" + dice + "</em>";
//example getter querySelector
//var x = document.querySelector("#score-0").textContent;
