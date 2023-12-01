import { findElementByXPath } from '../utils';

export function toggleSpookySeason(enable: boolean) {
  if (enable) {
    addSpookySeason();
  } else {
    removeSpookySeason();
  }
}

export function addSpookySeason() {
  createFallingLeaves();
}

function removeSpookySeason() {
  removeFallingLeaves();
}

function createFallingLeaves() {
  const numberOfLeaves = 25;

  for (let i = 0; i < numberOfLeaves; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';

    const size = Math.random() * 5 + 25;
    const duration = Math.random() * 5 + 5;

    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.setProperty('--random-left', Math.random().toString());

    const randomAutumnalColor = getRandomAutumnalColor();
    leaf.style.background = randomAutumnalColor;
    document.body.appendChild(leaf);
  }
}

function removeFallingLeaves() {
  while (document.getElementsByClassName('falling-leaf').length > 0) {
    document.getElementsByClassName('falling-leaf')[0].remove();
  }
}

function getRandomAutumnalColor() {
  const colors = ['#8B4513', '#D2691E', '#A52A2A', '#FFD700']; // Browns, oranges, and reds
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
