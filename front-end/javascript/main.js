// prompt user for name on pageload and append to score span
const playerName = prompt("Welcome to worseWordScapes! Please enter your name...", "Your name?");
if (playerName !== null) {
  document.getElementById("player_name").innerText = playerName;
}

// grab the current leaderboard and display it in #leaderboard
document.getElementById("leaderboard").appendChild(getLeaderBoard());

// frequency of each letter in english language.
const letterFrequencies = {
  E: 0.1202,
  T: 0.091,
  A: 0.0812,
  O: 0.0768,
  I: 0.0731,
  N: 0.0695,
  S: 0.0628,
  R: 0.0602,
  H: 0.0592,
  D: 0.0432,
  L: 0.0398,
  U: 0.0288,
  C: 0.0271,
  M: 0.0261,
  F: 0.023,
  Y: 0.0211,
  W: 0.0209,
  G: 0.0203,
  P: 0.0182,
  B: 0.0149,
  V: 0.0111,
  K: 0.0069,
  X: 0.0017,
  Q: 0.0011,
  J: 0.001,
  Z: 0.0007,
};

// round stuff { ---------------------------------------------------------
let characters;
let words;
let usedWords = [];

// }                -----------------------------------------------------

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

  //Reset Timer here

  //clear word display input
  clearInput();
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
  let score = document.getElementById("score");
  score.style.backgroundColor = "green";
  setTimeout(() => {
    score.style.backgroundColor = "";
  }, 1000);
}
//have score section flash red
function wrongWord() {
  let score = document.getElementById("score");
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

/* 
-------------------------------End of Event Listener Code--------------------------------------------
*/
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
  new Audio("assets/soundFiles/wowz.mp3")
];
// play random audio file on successful word validation
function playOwenWilsonWow() {
  //random selection of sounds to play from files
  const playRandSound = wows[Math.floor(Math.random()*wows.length)];
  //plays the sound
  playRandSound.play();
}


// pulls the leaderboard data from db. Returns a filled out leaderboard HTML element.
function getLeaderBoard() {
  // pull from a database somewhere.

  // hard coding for now
  let entries = [
    { name: "Levi", score: 12345 },
    { name: "Joe", score: 54321 },
    { name: "Luke", score: 67890 },
  ];

  entries = entries.sort((item1, item2) => {
    item2.score - item1.score;
  });

  // make a list and put the entries in it
  return createLeaderboardElement(entries);
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
    score.innerText = item.score;
    entry.innerText = item.name;
    entry.appendChild(score);

    leaderboard.appendChild(entry);
  });

  return leaderboard;
}

// get the characters for this round. accepts a number for number of characters to use
function getRoundCharacters(numCharacters) {
  const characters = [];

  for (let i = 0; i < numCharacters; i++) {
    characters.push(getValueFromLetterFreqs(Math.random()));
  }

  return characters;
}

// finds the appropiate letter from the frequency table (requires number to be between 0 and 1, otherwise only return 'Z')
function getValueFromLetterFreqs(num) {
  let returning;
  let sum = 0;
  for (item in letterFrequencies) {
    sum += letterFrequencies[item];
    if (num < sum) {
      return item;
    }
  }
  return "Z"; // default return if doesn't work
}

// load all the possible words into a data structure. Takes in an array of characters, assigns
// response from fetch call to the global 'words' variable.
function getWords(characters) {
  let query = characters.join("");

  const response = fetch(
    `https://word-scapes.herokuapp.com/start?letters=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      words = data.filter((item) => item.length > 2);
    });
}

// choose how many characters to use this round

// update the current score
function updateScore(increment) {
  const currentScore = document.querySelector("#current_score");
  let score = parseInt(currentScore.innerHTML) + increment;
  currentScore.innerHTML = score;
}

// check if word is valid. Accepts a string. Returns true or false
function isValidWord(word) {
  if (typeof word === "string") {
    if (
      !usedWords.includes(word.toUpperCase()) &&
      words.includes(word.toUpperCase())
    ) {
      playOwenWilsonWow();
      return true;
    }
  }
  // default return
  return false;
}

// SCRABBLE SCORE CODE
// assigns points to each letter of the alphabet
const letterVals = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

// get word, valiate, and score it
function getWordScore(word) {
  word = word.toUpperCase();
  if (isValidWord(word)) {
    usedWords.push(word);
    words = words.filter((e) => e !== word);
    let wordScore = 0;
    letterArray = word.split("");
    for (let index = 0; index < letterArray.length; index++) {
      const rawLetters = letterArray[index];
      wordScore += letterVals[rawLetters] || 0;
    }
    return wordScore;
  } else {
    return 0;
  }
}
