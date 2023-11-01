//DOM Elements
var newPaletteButton = document.querySelector(".new-palette-button");
var colorPaletteSection = document.querySelector(".color-palette");
var body = document.querySelector("body");
var paragraphsToChange = document.querySelectorAll(".hex-code");
var boxesToChange = document.querySelectorAll(".color-box");
var lockedIcon = document.querySelector(".locked-icon");
var unlockedIcon = document.querySelector(".unlocked-icon");
var colorBox = document.querySelectorAll(
  ".box-1, .box-2, .box-3, .box-4, .box-5"
);
var box1 = document.querySelector('#box1')
var box2 = document.querySelector('#box2')
var box3 = document.querySelector('#box3')
var box4 = document.querySelector('#box4')
var box5 = document.querySelector('#box5')

//Event Listeners
body.addEventListener('click', function(event) {
  if (event.target.className === 'new-palette-button') {
      displayHexCode();
      displayColor();
  }

  toggleLock();
});

//Event Handlers and Functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function toggleLock() {
  if (event.target.classList.contains('unlocked-icon')) {
    var parentContainer = event.target.closest('container');

    if (parentContainer) {
        var lockedIcon = parentContainer.querySelector('.locked-icon');
        var unlockedIcon = parentContainer.querySelector('.unlocked-icon');
        var colorSwatch = parentContainer.querySelector('div')
        
        colorSwatch.classList.add('locked');
        lockedIcon.classList.remove('hidden');
        unlockedIcon.classList.add('hidden');
    }
}

if (event.target.classList.contains('locked-icon')) {
    var parentContainer = event.target.closest('container');
    if (parentContainer) {
        var lockedIcon = parentContainer.querySelector('.locked-icon');
        var unlockedIcon = parentContainer.querySelector('.unlocked-icon');
        var colorSwatch = parentContainer.querySelector('div')
        
        colorSwatch.classList.remove('locked')
        lockedIcon.classList.add('hidden');
        unlockedIcon.classList.remove('hidden');
    }
}
}

function displayHexCode() {
  currentPalette = [];

  for (var i = 0; i < paragraphsToChange.length; i++) {
    if (!boxesToChange[i].classList.contains("locked")) {
      paragraphsToChange[i].innerText = generateHexCode();
    }

    currentPalette.push(paragraphsToChange[i].innerText);
  }
}

function displayColor() {
  for (var i = 0; i < boxesToChange.length; i++) {
    if (!boxesToChange[i].classList.contains("locked")) {
      boxesToChange[i].style.backgroundColor = `${paragraphsToChange[i].innerText}`;
    }
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
