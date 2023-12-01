import { findElementByXPath } from "../utils";

const sparklesTypes = [
  "cute-rainbow.gif",
  "orange.gif",
  "purple-sparks.gif",
  "rainbow-sparkles.gif",
  "sparkles-yellow.gif",
  "stars.gif",
  "starbursts.gif",
  "white-pops.gif",
];

const getRandomSparkle = () => {
  const randomIndex = Math.floor(Math.random() * sparklesTypes.length);
  return sparklesTypes[randomIndex];
};

export function toggleMakePremium(enable: boolean) {
  if (enable) {
    applyMakePremium();
  } else {
    removeMakePremium();
  }
}

export function applyMakePremium() {
  const premiumElements = document.getElementsByClassName("premium-sparkles");

  if (premiumElements && premiumElements.length > 0) {
    return;
  }

  const buttonsContainerXPath =
    "/html/body/div[1]/div/div/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div";
  const buttonsContainerXPathWhenLightsEnabled =
    "/html/body/div[3]/div/div/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div";
  const buttonsContainer =
    findElementByXPath(buttonsContainerXPath) ??
    findElementByXPath(buttonsContainerXPathWhenLightsEnabled);
  addPremiumSparklesToElement(
    buttonsContainer,
    -10,
    -20,
    undefined,
    undefined,
    70,
    70,
    30
  );

  const goalsContainerXPath =
    "/html/body/div[1]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div[3]";
  const goalsContainerXPathWhenLightsEnabled =
    "/html/body/div[3]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div[3]";
  const goalsContainer =
    findElementByXPath(goalsContainerXPath) ??
    findElementByXPath(goalsContainerXPathWhenLightsEnabled);
  addPremiumSparklesToElement(
    goalsContainer,
    -20,
    -20,
    undefined,
    undefined,
    120,
    120,
    45
  );
  addPremiumSparklesToElement(
    goalsContainer,
    undefined,
    undefined,
    -20,
    -20,
    120,
    120
  );

  const tasksContainerXPath =
    "/html/body/div[1]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div[1]";
  const tasksContainerXPathWhenLightsEnabled =
    "/html/body/div[3]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[1]/div[1]";
  const tasksContainer =
    findElementByXPath(tasksContainerXPath) ??
    findElementByXPath(tasksContainerXPathWhenLightsEnabled);
  addPremiumSparklesToElement(
    tasksContainer,
    -20,
    -20,
    undefined,
    undefined,
    120,
    120,
    60
  );
  addPremiumSparklesToElement(
    tasksContainer,
    undefined,
    undefined,
    -20,
    -20,
    120,
    120,
    90
  );

  const peopleContainerXPath =
    "/html/body/div[3]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div";
  const peopleContainerXPathWhenLightsEnabled =
    "/html/body/div[5]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div";
  const peopleContainer =
    findElementByXPath(peopleContainerXPath) ??
    findElementByXPath(peopleContainerXPathWhenLightsEnabled);

  console.log("people container: ", peopleContainer);
  addPremiumSparklesToElement(
    peopleContainer,
    -20,
    -20,
    undefined,
    undefined,
    120,
    120,
    70
  );
  addPremiumSparklesToElement(
    peopleContainer,
    undefined,
    undefined,
    -20,
    -20,
    120,
    120,
    120
  );
}

export function removeMakePremium() {
  const premiumElements = document.getElementsByClassName("premium-sparkles");

  for (const element of premiumElements) {
    element.remove();
  }
}

const addPremiumSparklesToElement = (
  element: any,
  topOffset?: number,
  rightOffset?: number,
  bottomOffset?: number,
  leftOffset?: number,
  width: number = 70,
  height: number = 70,
  rotate: number = 0
) => {
  if (!element) return;

  const sparklesGif = document.createElement("img");
  sparklesGif.className = "premium-sparkles";
  sparklesGif.src = chrome.runtime.getURL(getRandomSparkle());
  sparklesGif.style.position = "absolute";
  sparklesGif.style.top = topOffset + "px";
  sparklesGif.style.right = rightOffset + "px";
  sparklesGif.style.bottom = bottomOffset + "px";
  sparklesGif.style.left = leftOffset + "px";
  sparklesGif.style.width = width + "px";
  sparklesGif.style.height = height + "px";
  sparklesGif.style.transform = `rotate(${rotate}deg)`;
  sparklesGif.style.zIndex = "1001";

  element.style.position = "relative";
  element.appendChild(sparklesGif);
};
