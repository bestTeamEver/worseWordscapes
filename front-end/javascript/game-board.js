// make character circles
function makeCharacterCircle(character) {
  const circle = document.createElement("div");
  circle.setAttribute("class", "character-icon");
  circle.innerText = character;

  return circle;
}

// take an array of characters and insert into html character circle
function insertCharacters(characters) {
  // get the target to insert new character icons into
  const character_list = document.querySelector("#characters");
  character_list.innerHTML = ""; // clear the past characters

  // go through each character and place into target
  characters.forEach((character) => {
    const circle = makeCharacterCircle(character);
    const newEntry = document.createElement("li");
    newEntry.appendChild(circle);
    character_list.appendChild(newEntry);
  });
}
