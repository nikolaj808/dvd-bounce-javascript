// Inspired by: https://github.com/AlessioMaddaluno/bouncing-dvd-logo

import "./style.css";

const containerElement = document.getElementById("container");

const dvdElement = document.getElementById("dvd");

const fpsValueElement = document.getElementById("fpsValue");
const fpsSliderElement = document.getElementById("fpsSlider");

let baseSpeed = 2;
let fps = 120;
let upperXBound = containerElement.clientWidth - dvdElement.clientWidth;
let upperYBound = containerElement.clientHeight - dvdElement.clientHeight;

let dvd = {};
let timeout;

function initialize() {
  fpsValueElement.textContent = fps.toString();

  fpsSliderElement.addEventListener("input", (event) => {
    fps = event.target.value;
    fpsValueElement.textContent = fps.toString();
  });

  window.onresize = () => {
    upperXBound = containerElement.clientWidth - dvdElement.clientWidth;
    upperYBound = containerElement.clientHeight - dvdElement.clientHeight;
  };

  changeDvdBackgroundColorRandomly();

  getRandomStartPosition();

  getRandomStartDirections();

  animate();
}

initialize();

function animate() {
  const possibleNewLeft = dvd.left + dvd.xSpeed;
  const possibleNewTop = dvd.top + dvd.ySpeed;

  let newLeft = possibleNewLeft;
  let newTop = possibleNewTop;

  // if (possibleNewLeft <= 0) {
  //   newLeft = 0;
  //   newTop += possibleNewLeft;
  // }

  // if (possibleNewLeft >= upperXBound) {
  //   newLeft = upperXBound;
  //   newTop -= possibleNewLeft - upperXBound;
  // }

  // if (possibleNewTop <= 0) {
  //   newTop = 0;
  //   newLeft += possibleNewTop;
  // }

  // if (possibleNewTop >= upperYBound) {
  //   newTop = upperYBound;
  //   newLeft -= possibleNewTop - upperYBound;
  // }

  dvd.left = newLeft;
  dvd.top = newTop;

  dvdElement.style.left = `${dvd.left}px`;
  dvdElement.style.top = `${dvd.top}px`;

  if (checkCollisions()) {
    clearTimeout(timeout);
    return;
  }

  timeout = setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / fps);
}

function checkCollisions() {
  if (
    (dvd.left <= 0 || dvd.left >= upperXBound) &&
    (dvd.top <= 0 || dvd.top >= upperYBound)
  ) {
    console.log("You win!");

    return true;
  } else if (dvd.left <= 0 || dvd.left >= upperXBound) {
    dvd.xSpeed *= -1;

    changeDvdBackgroundColorRandomly();
  } else if (dvd.top <= 0 || dvd.top >= upperYBound) {
    dvd.ySpeed *= -1;

    changeDvdBackgroundColorRandomly();
  }
}

function getRandomStartPosition() {
  const left = pickRandomNumberBetween(0, upperXBound);
  const top = pickRandomNumberBetween(0, upperYBound);

  dvd.left = left;
  dvd.top = top;

  dvdElement.style.left = `${left}px`;
  dvdElement.style.top = `${top}px`;
}

function getRandomStartDirections() {
  const xRandom = pickRandomNumberBetween(1, 2);
  const yRandom = pickRandomNumberBetween(1, 2);

  if (xRandom === 1) {
    dvd.xSpeed = -baseSpeed;
  } else {
    dvd.xSpeed = baseSpeed;
  }

  if (yRandom === 1) {
    dvd.ySpeed = -baseSpeed;
  } else {
    dvd.ySpeed = baseSpeed;
  }
}

function changeDvdBackgroundColorRandomly() {
  const red = pickRandomNumberBetween(55, 255);
  const green = pickRandomNumberBetween(55, 255);
  const blue = pickRandomNumberBetween(55, 255);

  const newDvdBackgroundColor = `rgb(${red}, ${green}, ${blue})`;

  if (dvd.currentDvdBackgroundColor === newDvdBackgroundColor) {
    changeDvdBackgroundColorRandomly();

    return;
  }

  dvd.currentDvdBackgroundColor = newDvdBackgroundColor;

  dvdElement.style.backgroundColor = newDvdBackgroundColor;
}

// Picks a random number between min and max - both inclusive
function pickRandomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
