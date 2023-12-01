import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BsTree } from "react-icons/bs";
import { BsFillTreeFill } from "react-icons/bs";
import { GiPumpkinMask } from "react-icons/gi";
import { GiPumpkinLantern } from "react-icons/gi";
import { PiMoonStarsBold } from "react-icons/pi";
import { PiMoonStarsFill } from "react-icons/pi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { HiSparkles } from "react-icons/hi2";

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
    setIsLightsEnabled((prevState) => {
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

  const handlePremiumChange = () => {
    setIsMakePremiumEnabled((prevState) => {
      const newState = !prevState;
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

      return newState;
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
          <div className="my-2">
            <button
              onClick={handleLightsChange}
              className={`flex flex-row font-medium items-center border-2 bg-gradient-to-r ${
                !isLightsEnabled
                  ? "from-slate-200 to-slate-500 border-slate-500"
                  : "from-emerald-300 to-emerald-700 border-emerald-800 text-emerald-950"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-emerald-300 hover:to-emerald-700 hover:border-emerald-800 hover:text-white `}
            >
              {!isLightsEnabled ? (
                <BsTree className="mr-1" />
              ) : (
                <BsFillTreeFill className="mr-1" />
              )}
              Christmas lights
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={handleSpookySeasonChange}
              className={`flex flex-row font-medium items-center border-2 bg-gradient-to-r ${
                !isSpookySeasonEnabled
                  ? "from-slate-200 to-slate-500 border-slate-500"
                  : "from-orange-300 to-yellow-700 border-yellow-800 text-red-950"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-orange-300 hover:to-yellow-700 hover:border-yellow-800 hover:text-white`}
            >
              {!isSpookySeasonEnabled ? (
                <GiPumpkinLantern className="mr-1" />
              ) : (
                <GiPumpkinMask className="mr-1" />
              )}
              Spooky season
            </button>
          </div>
          <div className="my-1">
            <button
              onClick={handleModeChange}
              className={`flex flex-row font-medium items-center border-2 bg-gradient-to-r ${
                !isDarkModeEnabled
                  ? "from-slate-200 to-slate-500 border-slate-500"
                  : "from-fuchsia-600 to-purple-800 border-fuchsia-800 text-fuchsia-950"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-purple-800 hover:border-fuchsia-800 hover:text-white`}
            >
              {!isDarkModeEnabled ? (
                <PiMoonStarsBold className="mr-1" />
              ) : (
                <PiMoonStarsFill className="mr-1" />
              )}
              Dark mode
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={handlePremiumChange}
              className={`flex flex-row font-medium items-center border-2 bg-gradient-to-r ${
                !isMakePremiumEnabled
                  ? "from-slate-200 to-slate-500 border-slate-500"
                  : "from-yellow-300 via-orange-500 to-rose-600 border-rose-700 text-orange-800"
              } rounded-md py-1 px-2 hover:bg-gradient-to-r hover:from-yellow-300 hover:via-orange-500 hover:to-rose-600 hover:border-rose-700 hover:text-white`}
            >
              {!isMakePremiumEnabled ? (
                <HiOutlineSparkles className="mr-1" />
              ) : (
                <HiSparkles className="mr-1" />
              )}
              Make premium
            </button>
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
