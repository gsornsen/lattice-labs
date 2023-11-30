import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BsTree } from "react-icons/bs";
import { BsFillTreeFill } from "react-icons/bs";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [currentDatetime, setCurrentDatetime] = useState<Date>(new Date());
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false);
  const [isMakePremiumEnabled, setIsMakePremiumEnabled] =
    useState<boolean>(false);
  const [isLightsEnabled, setIsLightsEnabled] = useState<boolean>(false);

  // On component mount, load the saved state
  useEffect(() => {
    chrome.storage.sync.get(["christmasLights"], (result) => {
      console.log("was results.christmasLights true? ", result.christmasLights);
      setIsLightsEnabled(result.christmasLights || false);
    });
    console.log("is lights enabled? in useEffect: ", isLightsEnabled);
    chrome.storage.sync.get(["darkMode"], (result) => {
      setIsDarkModeEnabled(result.darkMode || false);
    });
    chrome.storage.sync.get(["makePremium"], (result) => {
      setIsMakePremiumEnabled(result.makePremium || false);
    });
  }, []);

  // Update the date and time every second
  useEffect(() => {
    const tick = () => {
      setCurrentDatetime(new Date());
    };
    const intervalId = setInterval(tick, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Get the current URL
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      setCurrentURL(tabs[0].url);
    });
  }, []);

  // Saving to Chrome storage and sending message to content script for Christmas lights
  useEffect(() => {
    chrome.storage.sync.set({ christmasLights: isLightsEnabled });

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          type: "christmasLights",
          enable: isLightsEnabled,
        });
      }
    });
  }, [isLightsEnabled]);

  const handleLightsChange = () => {
    setIsLightsEnabled(!isLightsEnabled);
  };

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newState = event.target.checked;
    setIsDarkModeEnabled(newState);
    chrome.storage.sync.set({ darkMode: newState });

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
    const newState = event.target.checked;
    setIsMakePremiumEnabled(newState);
    chrome.storage.sync.set({ makePremium: newState });

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
    <div className="bg-gray-100 text-base" style={{ width: "500px" }}>
      <div className="relative w-full h-24">
        <div className="absolute inset-0 flex justify-center items-center">
          <span className="text-5xl font-semibold text-white">
            Lattice Labs
          </span>
        </div>
        <div className="flex flex-row h-full">
          <div
            style={{ backgroundColor: "#16b8a2" }}
            className="w-1/3 h-full"
          ></div>
          <div
            style={{ backgroundColor: "#ffb41f" }}
            className="w-1/3 h-full"
          ></div>
          <div
            style={{ backgroundColor: "#f56358" }}
            className="w-1/3 h-full"
          ></div>
        </div>
      </div>
      <div className="p-4">
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
            <button
              onClick={handleLightsChange}
              className={`flex flex-row items-center bg-gradient-to-r ${
                !isLightsEnabled
                  ? "from-slate-200 to-slate-500"
                  : "from-emerald-300 to-emerald-700 text-emerald-800"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-emerald-300 hover:to-emerald-700 hover:text-white hover:border-emerald-700`}
            >
              {!isLightsEnabled ? (
                <BsTree className="mr-1" />
              ) : (
                <BsFillTreeFill className="mr-1" />
              )}
              Christmas lights
            </button>
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
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
