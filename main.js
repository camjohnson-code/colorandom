//DOM Elements
var newPaletteButton = document.querySelector(".new-palette-button");
var colorPaletteSection = document.querySelector(".color-palette");
var body = document.querySelector("body");
var paragraphsToChange = document.querySelectorAll(".hex-code");
var boxesToChange = document.querySelectorAll(".color-box");
var lockedIcon = document.querySelector(".locked-icon");
var unlockedIcon = document.querySelector(".unlocked-icon");
var colorBox = document.querySelectorAll(".box-1, .box-2, .box-3, .box-4, .box-5");
var savePaletteButton = document.querySelector('.save-palette-button');
var noSavedPaletteMessage = document.querySelector(".no-saved-palette-message");
var savedPalettesSection = document.querySelector('.saved-palettes');
var images = document.querySelectorAll('img');

//Event Listeners
body.addEventListener('click', function(event) {
  generateNewColors();
  savePalette();
  displaySavedPalette();
});

colorPaletteSection.addEventListener('click', toggleLock);

savedPalettesSection.addEventListener('click', function(event) {
  deletePalette();
  editPalette();
})

//Event Handlers and Functions
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function generateNewColors() {
  if (event.target.className === 'new-palette-button') {
    displayHexCode();
    displayColor();
  }
}

function editPalette() {
  if (event.target.classList.contains('saved-swatch')) {
    currentPalette = [];
    var container = event.target.closest('container');
    var index = Array.from(savedPalettesSection.children).indexOf(container);

    for (var i = 0; i < 5; i++) {
        boxesToChange[i].style.backgroundColor = `${savedPalettes[index][i]}`;
        paragraphsToChange[i].innerText = `${savedPalettes[index][i]}`;
        currentPalette.push(savedPalettes[index][i]);
    }

    for (var i = 0; i < images.length; i++) {
      if (images[i].classList.contains('locked-icon')) {
        images[i].classList.add('hidden');
      } else {
        images[i].classList.remove('hidden');
      }
    }
  }
}

function deletePalette() {
  if (event.target.classList.contains('delete-button')) {
    var paletteContainer = event.target.closest('container');
    
    var index = Array.from(savedPalettesSection.children).indexOf(paletteContainer);
    savedPalettes.splice(index, 1);
    
    paletteContainer.remove();
  }

  if (!savedPalettesSection.childElementCount) {
    noSavedPaletteMessage.classList.remove('hidden');
  }
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

function savePalette() {
  if (event.target.classList.contains('save-palette-button')){
    savedPalettes.push(currentPalette);
  }
}

function displaySavedPalette() {
  if (event.target.classList.contains('save-palette-button')){
    noSavedPaletteMessage.classList.add('hidden');

    var paletteContainer = document.createElement('container');

    for (var i = 0; i < savedPalettes.length; i++) {
      var individualPalette = savedPalettes[i];
      paletteContainer.innerHTML = "";

      for (var j = 0; j < individualPalette.length; j++) {
        var colorBox = document.createElement('div');
        colorBox.style.backgroundColor = individualPalette[j];
        colorBox.classList.add('saved-swatch');
        paletteContainer.appendChild(colorBox);
      }

      var deleteBtn = document.createElement('img');
      deleteBtn.src = 'assets/delete.png'
      deleteBtn.classList.add('delete-button');
      paletteContainer.appendChild(deleteBtn);
    }

    savedPalettesSection.appendChild(paletteContainer);
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
  var hexConditions = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  var hexColor = ["#"];

  for (var i = 0; i < 6; i++) {
    hexColor.push(hexConditions[getRandomIndex(hexConditions)]);
  }

  return hexColor.join("");
}

// Starting Conditions
displayHexCode();
displayColor();
 