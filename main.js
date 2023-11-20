// EVENT HANDLERS
var images = document.querySelectorAll('img');
var leftSide = document.querySelector('.left-side');
var boxesToChange = document.querySelectorAll('.individual-color');
var hexCodes = document.querySelectorAll('.hex-code');
var onScreenPalette = document.querySelector('.current-palette');
var savedPalettesSection = document.querySelector('.saved-palettes-section');
var noSavedPaletteMessage = document.getElementById('no-saved-palettes');

// EVENT LISTENERS
leftSide.addEventListener('click', function (event) {
  generateNewColors();
  savePalette();
  displaySavedPalettes();
});

onScreenPalette.addEventListener('click', function (event) {
  toggleLock();
});

savedPalettesSection.addEventListener('click', function (event) {
  deleteSavedPalette();
  editSavedPalette();
});

// FUNCTIONS
function getRandomNumber(arr) {
  return Math.floor(Math.random() * arr.length);
}

function generateHexCode() {
  var hexCharacters = 'ABCDEF0123456789';
  var hexElements = [...hexCharacters];
  var hexCode = ['#'];

  for (i = 0; i <= 5; i++) {
    hexCode.push(hexElements[getRandomNumber(hexElements)]);
  }
  return hexCode.join('');
}

function displayHexCode() {
  currentPalette = [];

  for (var i = 0; i < hexCodes.length; i++) {
    if (!boxesToChange[i].classList.contains('locked')) hexCodes[i].innerText = generateHexCode();
    currentPalette.push(hexCodes[i].innerText);
  }
}

function displayColors() {
  for (var i = 0; i < boxesToChange.length; i++) {
    if (!boxesToChange[i].classList.contains('locked'))
      boxesToChange[i].style.backgroundColor = `${currentPalette[i]}`;
  }
}

function generateNewColors() {
  if (event.target.classList.contains('new-palette-button')) displayHexCode(), displayColors();
}

function toggleLock() {
  var parentContainer = event.target.closest('container');
  var lockedIcon = parentContainer.querySelector('.locked-icon');
  var unlockedIcon = parentContainer.querySelector('.unlocked-icon');
  var colorSwatch = parentContainer.querySelector('div');

  if (event.target.classList.contains('unlocked-icon'))
    colorSwatch.classList.add('locked'),
      lockedIcon.classList.remove('hidden'),
      unlockedIcon.classList.add('hidden');

  if (event.target.classList.contains('locked-icon'))
    colorSwatch.classList.remove('locked'),
      lockedIcon.classList.add('hidden'),
      unlockedIcon.classList.remove('hidden');
}

function addToLocalStorage() {
  var existingPalettes = JSON.parse(localStorage.getItem('savedPalette')) || [];
  existingPalettes.push(currentPalette);
  localStorage.setItem('savedPalette', JSON.stringify(existingPalettes));
}

function savePalette() {
  if (event.target.classList.contains('save-palette-button')) {
    savedPalettes.push(currentPalette);
    addToLocalStorage();
  }
}

function displaySavedPalettes() {
  savedPalettesSection.innerHTML = '';

  if (savedPalettes.length === 0) {
    noSavedPaletteMessage.classList.remove('hidden');
  } else {
    noSavedPaletteMessage.classList.add('hidden');
  }

  for (var i = 0; i < savedPalettes.length; i++) {
    var individualPalette = savedPalettes[i];
    var paletteContainer = document.createElement('container');

    for (var j = 0; j < individualPalette.length; j++) {
      var colorBox = document.createElement('div');
      colorBox.style.backgroundColor = individualPalette[j];
      colorBox.classList.add('saved-swatch');
      paletteContainer.appendChild(colorBox);
    }

    var deleteImg = document.createElement('img');
    deleteImg.src = 'assets/delete.png';
    deleteImg.classList.add('delete-button');
    paletteContainer.appendChild(deleteImg);
    savedPalettesSection.appendChild(paletteContainer);
  }
}

function updateLocalStorage() {
  localStorage.setItem('savedPalette', JSON.stringify(savedPalettes));
}

function deleteSavedPalette() {
  if (event.target.classList.contains('delete-button')) {
    var paletteContainer = event.target.closest('container');
    var index = Array.from(savedPalettesSection.children).indexOf(paletteContainer);

    savedPalettes.splice(index, 1);
    paletteContainer.remove();

    updateLocalStorage();

    if (savedPalettes.length === 0) {
      noSavedPaletteMessage.classList.remove('hidden');
    }
  }

  if (!savedPalettes.length) noSavedPaletteMessage.classList.remove('hidden');
}

function editSavedPalette() {
  if (event.target.classList.contains('saved-swatch')) {
    currentPalette = [];
    var container = event.target.closest('container');
    var index = Array.from(savedPalettesSection.children).indexOf(container);

    for (var i = 0; i < 5; i++) {
      boxesToChange[i].style.backgroundColor = `${savedPalettes[index][i]}`;
      hexCodes[i].innerText = `${savedPalettes[index][i]}`;
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

// STARTING CONDITIONS
document.addEventListener('DOMContentLoaded', function () {
  displayHexCode();
  displayColors();
  displaySavedPalettes();
});