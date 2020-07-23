//---------------------------------- Global Variables ---------------------------------

// prompt user for name on pageload and append to score span
const playerName = prompt(
  "Welcome to worseWordScapes! Please enter your name...",
  "Player"
);
if (playerName !== null && playerName !== "") {
  document.getElementById("player_name").innerText = playerName;
}

// grab the current leaderboard and display it in #leaderboard
getLeaderBoard();

//----------------------------------- End Global Variables -----------------------

/*
----------------------Begin Event Listener Code-----------------------------------
*/

//start a new round with designated number of characeters
function newGame(numberOfChars) {
  //create list of all characters for the round
  characters = getRoundCharacters(numberOfChars);
  // insert the characters to the game board
  insertCharacters(characters);
  //use characters to set words
  getWords(characters);

  //clear usedWords list
  usedWords = [];
  //set score to zero
  document.getElementById("current_score").innerText = 0;
  document.getElementById("roundCount").innerText = 1;
  //Reset Timer here

  //clear word display input
  clearInput();
  document.getElementById("clearInputBtn").style.visibility = "visible";

  //start game with time of one minute
  clearInterval(globalTime);
  gameTimer(60);
}

//start button
let startBtn = document.getElementById("startButton");

//get number of characters from input
//add characters to gameboard via newGame()
//update words via getWords()
startBtn.addEventListener("click", (e) => {
  //use number input to set characters
  let numberInput = document.getElementById("numberInput").value;
  numberInput !== ""
    ? newGame(numberInput)
    : alert("Please select a number of letters for this round");
});

//function to clear word input /display
function clearInput() {
  document.getElementById("wordDisplay").value = "";
  //reset character buttons
  insertCharacters(characters);
  //add submit button
  document.getElementById("submitButton").style.visibility = "visible";
}

//clear word input on clear button click
document.getElementById("clearInputBtn").addEventListener("click", (e) => {
  clearInput();
});

//submit word input on submit button click
document.getElementById("submitButton").addEventListener("click", (e) => {
  let wordInput = document.getElementById("wordDisplay").value;
  let score = getWordScore(wordInput);
  //if correct run correct display else do wrong dispaly
  score !== 0 ? correctWord() : wrongWord();
  updateScore(score);
  roundComplete();
  clearInput();
});

//submit word input on enter keypress
document.getElementById("wordDisplay").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    let wordInput = document.getElementById("wordDisplay").value;
    let score = getWordScore(wordInput);
    //if correct run correct display else do wrong display
    score !== 0 ? correctWord() : wrongWord();
    updateScore(score);
    clearInput();
  }
});

//score section flash green on correct word
function correctWord() {
  let score = document.getElementById("scoreDisplay");
  score.style.backgroundColor = "green";
  setTimeout(() => {
    score.style.backgroundColor = "";
  }, 1000);
}
//have score section flash red
function wrongWord() {
  let score = document.getElementById("scoreDisplay");
  score.style.backgroundColor = "red";
  setTimeout(() => {
    score.style.backgroundColor = "";
  }, 1000);
}

//hint button highlights letters of a the last word in words list
function showHint() {
  let word = words[words.length - 1].split("");
  //list of all html letter elements
  let htmlLetters = [...document.getElementsByClassName("character-icon")];
  //highlights html element if letter is in word array
  //filters words every time to prevent duplicate letters being highlighted
  //brute force
  htmlLetters.forEach((element) => {
    if (word.includes(element.innerText)) {
      element.style.backgroundColor = "yellow";
      word = word.filter((letter) => letter !== element.innerText);
    }
  });
}

//event listener to hint button
document.getElementById("hintButton").addEventListener("click", (e) => {
  showHint();
});

//game over function
function endGame() {
  document.getElementById("gameTimer").innerText = "Game Over";
  document.getElementById("characters").innerHTML = "";
  document.getElementById("submitButton").style.visibility = "hidden";
  document.getElementById("clearInputBtn").style.visibility = "hidden";
  let baseScore = parseInt(document.getElementById("current_score").innerText);
  document.getElementById("current_score").innerText =
    "Final score: " + parseInt(baseScore * rounds);
  playOwenWilsonWow();
}

/* 
-------------------------------End of Event Listener Code--------------------------------------------
*/

// -------------------------------------Timer functionality----------------------------------------

let timeDisplay = document.getElementById("gameTimer");
let globalTime;
function gameTimer(time) {
  let seconds = parseInt(time);
  globalTime = setInterval(() => {
    timeDisplay.innerHTML = seconds;
    if (seconds === 0) {
      endGame();
      clearInterval(globalTime);
      if (window.confirm("Save Score?")) {
        sendHighScore();
      }
    }
    seconds -= 1;
  }, 1000);
  //need not hardcoded input method
}

//--------------------------------------End Timer Functionality------------------------------------
/*
------------------------------------Sound Feature Code-----------------------------------------------
*/
//array that houses all sounds
const wows = [
  new Audio("assets/soundFiles/wowa.mp3"),
  new Audio("assets/soundFiles/wowb.mp3"),
  new Audio("assets/soundFiles/wowc.mp3"),
  new Audio("assets/soundFiles/wowe.mp3"),
  new Audio("assets/soundFiles/wowd.mp3"),
  new Audio("assets/soundFiles/wowf.mp3"),
  new Audio("assets/soundFiles/wowg.mp3"),
  new Audio("assets/soundFiles/wowh.mp3"),
  new Audio("assets/soundFiles/wowi.mp3"),
  new Audio("assets/soundFiles/wowj.mp3"),
  new Audio("assets/soundFiles/wowk.mp3"),
  new Audio("assets/soundFiles/wowl.mp3"),
  new Audio("assets/soundFiles/wowm.mp3"),
  new Audio("assets/soundFiles/wown.mp3"),
  new Audio("assets/soundFiles/wowp.mp3"),
  new Audio("assets/soundFiles/wowq.mp3"),
  new Audio("assets/soundFiles/wowr.mp3"),
  new Audio("assets/soundFiles/wows.mp3"),
  new Audio("assets/soundFiles/wowu.mp3"),
  new Audio("assets/soundFiles/wowv.mp3"),
  new Audio("assets/soundFiles/woww.mp3"),
  new Audio("assets/soundFiles/wowx.mp3"),
  new Audio("assets/soundFiles/wowy.mp3"),
  new Audio("assets/soundFiles/wowz.mp3"),
];
// play random audio file on successful word validation
function playOwenWilsonWow() {
  //random selection of sounds to play from files
  const playRandSound = wows[Math.floor(Math.random() * wows.length)];
  //plays the sound
  playRandSound.play();
}

/*
------------------------------------------End Sound Code------------------------------------
*/

// -------------------------------------- Begin leaderboard Code ---------------------------

// pulls the leaderboard data from db. Returns a filled out leaderboard HTML element.
function getLeaderBoard() {
  // clear the past leaderboard
  document.getElementById("leaderboard").innerHTML = "";

  // pull from a database somewhere.
  fetch("https://word-scapes.herokuapp.com/scores?limit=5")
    .then((res) => res.json())
    .then((data) =>
      document
        .getElementById("leaderboard")
        .appendChild(createLeaderboardElement(data))
    );
}

// creates and returns a leaderboard HTML element. Accepts an array of objects with {name, score}
function createLeaderboardElement(entries) {
  const leaderboard = document.createElement("ul");
  leaderboard.setAttribute("class", "list-group");
  entries.forEach((item) => {
    const entry = document.createElement("li");
    entry.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between align-items-center"
    );

    const score = document.createElement("span");
    score.setAttribute("class", "badge badge-primary badge-pill");
    score.innerText = item.high_score;
    entry.innerText = item.name;
    entry.appendChild(score);

    leaderboard.appendChild(entry);
  });

  return leaderboard;
}

//---------------------------------------- End leaderboard Code ------------------------------

/*
------------------------------------------- Begin Difficulty functions----------------------------
*/

let rounds = 1;
function roundComplete() {
  if (usedWords.length / (words.length + usedWords.length) >= 0.25) {
    newRound();
    rounds += 1;
    document.getElementById("roundCount").innerText = rounds;
  }
  return "Z"; // default return if doesn't work
}

function newRound() {
  //Get new set of characters upon round increment
  characters = getRoundCharacters(document.getElementById("numberInput").value);
  // insert the characters to the game board
  insertCharacters(characters);
  //use characters to set words
  getWords(characters);
  usedWords = [];
}

// link this once the game ends functionality is in place ----------------------------------------
function sendHighScore() {
  const data = {};

  // set up the values in the object
  // name
  data.name = document.getElementById("player_name").innerText; // hard coded now until name is prompted at beginning --------------------------
  data.high_score = parseInt(
    document.querySelector("#current_score").innerText.split(" ").pop()
  );
  let date = new Date();
  data.date = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  fetch("https://word-scapes.herokuapp.com/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Response:", data);
      setTimeout(getLeaderBoard(), 500);
    });
}
