// add a listener to change the widths

// make character circles
function makeCharacterCircle(character) {
  const circle = document.createElement("div");
  circle.setAttribute("class", "character-icon");
  circle.innerText = character;
  circle.addEventListener("click", (e) => {
    document.getElementById("wordDisplay").value += e.target.innerText;
  });

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

  //   const character_container = document.querySelector("#character-container");
  //   let radius = Math.floor(
  //     (character_container.parentElement.clientWidth / 2) * 0.75
  //   );

  placeCharacterCircles();
}

// places the character circles in a circular fashion around character-container div.
function placeCharacterCircles() {
  const character_container = document.querySelector("#character-container");
  const list = document.getElementById("characters");

  // compute the radius and offset to align in middle
  let radius = Math.floor(
    (character_container.parentElement.clientWidth / 2) * 0.75
  );
  let offset =
    document.getElementsByClassName("character-icon")[0].clientWidth / 10;

  let angle = 360 / list.childElementCount; // shift around to start at top of circle

  // add css for each child in list (e.g. the character circles)
  list.childNodes.forEach((item, index) => {
    // set the width and height appropiately
    item.firstChild.style.width = `${
      document.getElementById("character-container").clientWidth / 7
    }px`;

    item.firstChild.style.height = `${
      document.getElementById("character-container").clientHeight / 7
    }px`;

    // translate to right position;
    item.style.position = "absolute";
    item.style.transform = `rotate(${
      angle * index
    }deg) translate(${radius}px) rotate(${angle * index * -1}deg)`;
  });

  // add final css touches
  list.style.top = `${radius + offset}px`;
  list.style.left = `${radius + offset}px`;
  list.style.position = "relative";
  list.style["list-style-type"] = "none";
  list.style.margin = 0;
  list.style.padding = 0;
}

// add an observer for the character container (to be responsive)
const ro = new ResizeObserver((entries) => {
  for (entry in entries) {
    placeCharacterCircles();
  }
});

ro.observe(document.getElementById("character-container"));
