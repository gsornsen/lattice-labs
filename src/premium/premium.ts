import { findElementByXPath } from "../utils";

export function toggleMakePremium(enable: boolean) {
  if (enable) {
    applyMakePremium();
  } else {
    removeMakePremium();
  }
}

export function applyMakePremium() {
  const buttonsContainerXPath =
    "/html/body/div[1]/div/div/div/div/div[2]/div/div/div[1]/div[1]/div[2]/div";
  const buttonsContainer = findElementByXPath(buttonsContainerXPath);
  addPremiumSparklesToElement(buttonsContainer);
}

export function removeMakePremium() {
  const premiumElement = document.getElementById("premium-sparkles");
  if (premiumElement) {
    premiumElement.remove();
  }
}

const addPremiumSparklesToElement = (
  element: any,
  topOffset: number = -10,
  rightOffset: number = -20,
  width: number = 70,
  height: number = 70
) => {
  if (!element) return;

  const sparklesGif = document.createElement("img");
  sparklesGif.id = "premium-sparkles";
  sparklesGif.src = chrome.runtime.getURL("rainbow-sparkles.gif");
  sparklesGif.style.position = "absolute";
  sparklesGif.style.top = topOffset + "px";
  sparklesGif.style.right = rightOffset + "px";
  sparklesGif.style.width = width + "px";
  sparklesGif.style.height = height + "px";
  sparklesGif.style.zIndex = "1000";

  element.style.position = "relative";
  element.appendChild(sparklesGif);
};
