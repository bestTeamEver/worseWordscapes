// grab the current leaderboard and display it in #leaderboard
document.getElementById("leaderboard").appendChild(getLeaderBoard());

const characters = ["A", "B", "C", "D", "E", "F", "G", "H"];
insertCharacters(characters);

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

// get the characters for this round

// load all the possible words into a data structure.

// chose how many characters to use this round

// update the current score
function updateScore(increment) {
  const currentScore = document.querySelector("#current_score");
  let score = currentScore.innerHTML + increment;

  currentScore.innerHTML = score;
}

// check if word is valid
function isValidWord(word) {
  // hasn't been used already
  // is in the valid words array/object
  // return true if good otherwise false
}


// SCRABBLE SCORE CODE
// assigns points to each letter of the alphabet
const letterVals = {
  "A": 1,
  "B": 3,
  "C": 3,
  "D": 2,
  "E": 1,
  "F": 4,
  "G": 2,
  "H": 4,
  "I": 1,
  "J": 8,
  "K": 5,
  "L": 1,
  "M": 3,
  "N": 1,
  "O": 1,
  "P": 3,
  "Q": 10,
  "R": 1,
  "S": 1,
  "T": 1,
  "U": 1,
  "V": 4,
  "W": 4,
  "X": 8,
  "Y": 4,
  "Z": 10
}

