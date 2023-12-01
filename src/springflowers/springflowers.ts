export function toggleSpringFlowers(enable: boolean) {
  if (enable) {
    addSpringFlowers();
  } else {
    removeSpringFlowers();
  }
}

export function addSpringFlowers() {
  createFallingFlowers();
}

function removeSpringFlowers() {
  removeFallingFlowers();
}

function createFallingFlowers() {
  const numberOfFlowers = 25;

  for (let i = 0; i < numberOfFlowers; i++) {
    const petal = document.createElement('div');
    petal.className = 'spring-flower';

    const size = Math.random() * 5 + 10;
    const duration = Math.random() * 5 + 5;

    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.setProperty('--start-left', `${Math.random() * 100}vw`); // Random left position
    petal.style.setProperty('--start-top', `${Math.random() * 100}vh`); // Random top position

    const randomSpringColor = getRandomSpringColor();
    petal.style.background = randomSpringColor;
    document.body.appendChild(petal);
  }
}

function removeFallingFlowers() {
  while (document.getElementsByClassName('spring-flower').length > 0) {
    document.getElementsByClassName('spring-flower')[0].remove();
  }
}

function getRandomSpringColor() {
    const colors = [
    '#FFC0CB', '#FFB6C1'
    ];
      
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}