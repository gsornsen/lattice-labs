import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [currentDatetime, setCurrentDatetime] = useState<Date>(new Date());
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false);
  const [isMakePremiumEnabled, setIsMakePremiumEnabled] =
    useState<boolean>(false);
  const [isLightsEnabled, setIsLightsEnabled] = useState<boolean>(false);

  useEffect(() => {
    // On component mount, load the saved state
    chrome.storage.sync.get(["christmasLights"], (result) => {
      setIsLightsEnabled(result.christmasLights || false);
    });
    chrome.storage.sync.get(["darkMode"], (result) => {
      setIsDarkModeEnabled(result.darkMode || false);
    });
  }, []);

  const handleLightsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update state and save to Chrome storage
    const newState = event.target.checked;
    setIsLightsEnabled(newState);
    chrome.storage.sync.set({ christmasLights: newState });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "christmasLights",
          enable: newState,
        });
      }
    });
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update state and save to Chrome storage
    const newState = event.target.checked;
    setIsDarkModeEnabled(newState);
    chrome.storage.sync.set({ darkMode: newState });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "darkMode",
          enable: newState,
        });
      }
    });
  };

  const handlePremiumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update state and save to Chrome storage
    const newState = event.target.checked;
    setIsMakePremiumEnabled(newState);
    chrome.storage.sync.set({ makePremium: newState });

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "makePremium",
          enable: newState,
        });
      }
    });
  };

  useEffect(() => {
    // Function to update the date and time
    const tick = () => {
      setCurrentDatetime(new Date());
    };

    // Set up an interval to call the tick function every second
    const intervalId = setInterval(tick, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  const addBionicReading = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(
          tab.id,
          { action: "addBionicReading" },
          function (response) {
            console.log(response);
          }
        );
      }
    });
  };

  return (
    <div className="bg-gray-100 p-4 text-base" style={{ width: "500px" }}>
      <ul>
        <li className="font-bold">
          Current URL: <span className="font-normal">{currentURL}</span>
        </li>
        <li className="font-bold">
          Current date and time:{" "}
          <span className="font-normal">
            {currentDatetime.toLocaleString()}
          </span>
        </li>
      </ul>
      <div className="pt-4">
        <div>
          <input
            type="checkbox"
            id="lightsEnabledCheckbox"
            checked={isLightsEnabled}
            onChange={handleLightsChange}
          />
          <label htmlFor="lightsEnabledCheckbox">
            {" "}
            Enable Christmas lights
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="darkModeEnabledCheckbox"
            checked={isDarkModeEnabled}
            onChange={handleModeChange}
          />
          <label htmlFor="darkModeEnabledCheckbox"> Enable dark mode</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="makePremiumEnabledCheckbox"
            checked={isMakePremiumEnabled}
            onChange={handlePremiumChange}
          />
          <label htmlFor="makePremiumEnabledCheckbox"> Make premium</label>
        </div>
        <div>
          <button onClick={addBionicReading}> Enable bionic reading</button>
        </div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
