// add a listener to change the widths

//function to enable clicking of buttons once
function clickOnce(e) {
  //add letter to display
  document.getElementById("wordDisplay").value += e.target.innerText;
  //remove clicking css style
  e.target.classList.remove("clickable");
  //change background
  e.target.style.background = "red";
  //remove event listener for clicking
  e.target.removeEventListener("click", clickOnce);
}

// make character circles
function makeCharacterCircle(character) {
  const circle = document.createElement("div");
  //clickable class used for clickable functionality
  circle.setAttribute("class", "character-icon clickable");
  circle.innerText = character;
  //add clickable functionality
  circle.addEventListener("click", clickOnce);

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
  let offset = (list.clientWidth - 40) / 10;

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
    item.style.transform = `rotate(${angle * index}deg) translate(${
      radius - offset
    }px) rotate(${angle * index * -1}deg)`;
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
  for (entry of entries) {
    entry.target.style.height = `${entry.target.clientWidth}px`;
    placeCharacterCircles();
  }
});

ro.observe(document.getElementById("character-container"));
