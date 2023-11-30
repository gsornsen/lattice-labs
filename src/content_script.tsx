import { toggleChristmasLights } from './christmaslights/christmaslights';
import { toggleDarkMode } from "./darkmode/darkmode";
import { traverseAndConvert } from "./bionic/bionic";

chrome.runtime.onMessage.addListener(function (msg: any, sender, sendResponse) {
  if (msg.type === "christmasLights") {
    toggleChristmasLights(msg.enable);
    sendResponse("Toggled Christmas lights");
  } else if (msg.action === "addBionicReading") {
    sendResponse("Activated bionic reading");
    traverseAndConvert(document.body);
  } else if (msg.type === "darkMode") {
    toggleDarkMode(msg.enable);
    sendResponse("Toggled dark mode");
  } else {
    sendResponse("Unrecognized message");
  }
});

// On script load, check the stored state
chrome.storage.sync.get(["christmasLights"], (result) => {
  toggleChristmasLights(result.christmasLights);
});

chrome.storage.sync.get(["darkMode"], (result) => {
  toggleDarkMode(result.darkMode);
});
