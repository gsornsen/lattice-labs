import { toggleChristmasLights } from './christmaslights/christmaslights';
import { toggleSpookySeason } from './spookyseason/spookyseason';
import { toggleDarkMode } from "./darkmode/darkmode";
import { traverseAndConvert } from "./bionic/bionic";
import { toggleMakePremium } from "./premium/premium";

chrome.runtime.onMessage.addListener(function (msg: any, sender, sendResponse) {
  if (msg.type === "christmasLights") {
    toggleChristmasLights(msg.enable);
    sendResponse("Toggled Christmas lights");
  }
    else if (msg.type === 'spookySeason') {
      toggleSpookySeason(msg.enable);
      sendResponse('Toggled Spooky Season');
  }
  else if (msg.action === "addBionicReading") {
    sendResponse("Activated bionic reading");
    traverseAndConvert(document.body);
  } else if (msg.type === "darkMode") {
    toggleDarkMode(msg.enable);
    sendResponse("Toggled dark mode");
  } else if (msg.type === "makePremium") {
    toggleMakePremium(msg.enable);
    sendResponse("Toggled premium");
  } else {
    sendResponse("Unrecognized message");
  }
});

// On script load, check the stored state
chrome.storage.sync.get(["christmasLights"], (result) => {
  toggleChristmasLights(result.christmasLights);
});

chrome.storage.sync.get(['spookySeason'], result => {
  toggleSpookySeason(result.spookySeason);
});

chrome.storage.sync.get(["darkMode"], (result) => {
  toggleDarkMode(result.darkMode);
});

chrome.storage.sync.get(["makePremium"], (result) => {
  toggleMakePremium(result.makePremium);
});
