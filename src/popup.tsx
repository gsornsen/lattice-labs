import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BsTree } from "react-icons/bs";
import { BsFillTreeFill } from "react-icons/bs";
import { PiMoonStarsBold } from "react-icons/pi";
import { PiMoonStarsFill } from "react-icons/pi";

const Popup = () => {
  const [currentURL, setCurrentURL] = useState<string>();
  const [currentDatetime, setCurrentDatetime] = useState<Date>(new Date());
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(false);
  const [isMakePremiumEnabled, setIsMakePremiumEnabled] =
    useState<boolean>(false);
  const [isLightsEnabled, setIsLightsEnabled] = useState<boolean>(false);
  const [isSpookySeasonEnabled, setIsSpookySeasonEnabled] = useState<boolean>(false);

  // On component mount, load the saved state
  useEffect(() => {
    chrome.storage.sync.get(
      ["christmasLights", "darkMode", "makePremium", "spookySeason"],
      (result) => {
        console.log(result);
        setIsLightsEnabled(result.christmasLights ?? false);
        setIsDarkModeEnabled(result.darkMode ?? false);
        setIsMakePremiumEnabled(result.makePremium ?? false);
        setIsSpookySeasonEnabled(result.spookySeason ?? false);
      }
    );
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

  const handleSpookySeasonChange = () => {
    setIsSpookySeasonEnabled((prevState) => {
      const newState = !prevState;
      chrome.storage.sync.set({ spookySeason: newState });

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: "spookySeason",
            enable: newState,
          });
        }
      });
      return newState;
    });
  };

  const handleLightsChange = () => {
    setIsSpookySeasonEnabled((prevState) => {
      const newState = !prevState;
      chrome.storage.sync.set({ christmasLights: newState });

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, {
            type: "christmasLights",
            enable: newState,
          });
        }
      });
      return newState;
    });
  };

  const handleModeChange = () => {
    setIsDarkModeEnabled((prevState) => {
      const newState = !prevState;
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

      return newState;
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
    <div
      className="bg-gray-100 text-base font-quicksand"
      style={{ width: "500px" }}
    >
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
          <div className="my-1">
            <button
              onClick={handleLightsChange}
              className={`flex flex-row font-medium items-center bg-gradient-to-r ${
                !isLightsEnabled
                  ? "from-slate-200 to-slate-500"
                  : "from-emerald-300 to-emerald-700 text-emerald-950"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-emerald-300 hover:to-emerald-700 hover:text-white`}
            >
              {!isLightsEnabled ? (
                <BsTree className="mr-1" />
              ) : (
                <BsFillTreeFill className="mr-1" />
              )}
              Christmas lights
            </button>
          </div>
          <div className="my-1">
            <button
              onClick={handleModeChange}
              className={`flex flex-row font-medium items-center bg-gradient-to-r ${
                !isDarkModeEnabled
                  ? "from-slate-200 to-slate-500"
                  : "from-fuchsia-600 to-purple-800 text-fuchsia-950"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-purple-800 hover:text-white`}
            >
              {!isDarkModeEnabled ? (
                <PiMoonStarsBold className="mr-1" />
              ) : (
                <PiMoonStarsFill className="mr-1" />
              )}
              Dark mode
            </button>
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
