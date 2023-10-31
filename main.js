//DOM Elements
var newPaletteButton = document.querySelector(".new-palette-button");
var colorPaletteSection = document.querySelector('.color-palette');
var body = document.querySelector('body');
var paragraphsToChange = document.querySelectorAll('.hex-code');
var boxesToChange = document.querySelectorAll('.color-box');


//Event Listeners
body.addEventListener('click', function(event) {
    if(event.target.className === 'new-palette-button') {
        displayHexCode();
        displayColor();
    }
});

//Event Handlers and Functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function displayHexCode() {
    currentPalette = [];

    for (var i = 0; i < paragraphsToChange.length; i++) {
        paragraphsToChange[i].innerText = generateHexCode();
        currentPalette.push(paragraphsToChange[i].innerText);
    }
}

function displayColor() {
    for (var i = 0; i < boxesToChange.length; i++) {
        boxesToChange[i].style.backgroundColor = `${paragraphsToChange[i].innerText}`;
    }
}


function generateHexCode() {
  var hexConditions = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  var hexColor = ["#"];

  for (var i = 0; i < 6; i++) {
    hexColor.push(hexConditions[getRandomIndex(hexConditions)]);
  }

  return hexColor.join("");
}


// Starting Conditions
displayHexCode();
displayColor();