import { findElementByXPath } from "../utils";

export function toggleMakePremium(enable: boolean) {
  if (enable) {
    applyMakePremium();
  } else {
    removeMakePremium();
  }
}

export function applyMakePremium() {
  const xpath =
    "/html/body/div[2]/div/div/div/div/div[2]/div/div/div[1]/div[1]/div[1]/div/button/div";
  const element = findElementByXPath(xpath);
  addPremiumSparklesToElement(element, 10);

  const xpath2 =
    "/html/body/div[2]/div/div/div/div/div[2]/div/nav/div[3]/button/div/div/div/div/div/div/div[1]";
  const element2 = findElementByXPath(xpath2);
  addPremiumSparklesToElement(element2);

  const xpath3 =
    "/html/body/div[2]/div/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div/div[1]/div[1]/a[2]/div/div";
  const element3 = findElementByXPath(xpath3);
  addPremiumSparklesToElement(element3);
}

export function removeMakePremium() {
  const premiumElement = document.getElementById("premium-sparkles");
  if (premiumElement) {
    premiumElement.remove();
  }
}

const addPremiumSparklesToElement = (element: any, offsetRight: number = 0) => {
  if (!element) return;

  const santaHatImg = document.createElement("img");
  santaHatImg.id = "santa-hat";
  santaHatImg.src = chrome.runtime.getURL("santa_hat_smaller.png");
  santaHatImg.style.position = "absolute";
  santaHatImg.style.top = "-10px";
  santaHatImg.style.right = offsetRight + "px";
  santaHatImg.style.width = "auto"; // Adjust size as needed
  santaHatImg.style.height = "auto";
  santaHatImg.style.zIndex = "1000";

  element.style.position = "relative";
  element.appendChild(santaHatImg);
};
