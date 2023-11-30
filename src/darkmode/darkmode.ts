export function toggleDarkMode(enable: boolean) {
  if (enable) {
    applyDarkMode();
  } else {
    removeDarkMode();
  }
}

export function applyDarkMode() {
  const darkModeStyle = `
    /* overall background */
    #__next > div > div > div > div > div > div > div {
        background: linear-gradient(to bottom, #121212 40%, #1a1444 70%, #593DBA 100%) !important;
        color: #FFFFFF !important;
    } 

    /* goals container */
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1hiv8d5 {
        background-color: #2A2E45 !important;
        border-color: #2A2E45 !important;
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1hiv8d5 .chakra-text {
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1hiv8d5 .chakra-link {
        color: #FFFFFF !important;
    }

    /* tasks container */
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1s9iw55 {
        background-color: #2A2E45 !important;
        border-color: #2A2E45 !important;
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1s9iw55 .chakra-text {
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(1) > div.css-1s9iw55 .chakra-link {
        color: #FFFFFF !important;
    }

    /* people container */
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div {
        background-color: #2A2E45 !important;
        border-color: #2A2E45 !important;
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div .chakra-text {
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div > div.css-1yvcyuw > div > div.css-k008qs > button > span {
        color: #FFFFFF !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div > div.css-1yvcyuw > div > div.css-j7qwjs > div > div.css-17k9g83 > div:nth-child(1) > div > div.css-1kivf96 > div > span {
        color: #2A2E45 !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div > div.css-1yvcyuw > div > div.css-j7qwjs > div > div.css-17k9g83 > div:nth-child(2) > div > div.css-1kivf96 > div > span {
        color: #2A2E45 !important;
    }
    #__next > div > div > div > div > div.css-1mj08pv > div > div > div.css-1jsv737 > div.css-1lpblea > div:nth-child(2) > div > div.css-1yvcyuw > div > div.css-j7qwjs > div > div.css-17k9g83 > div:nth-child(3) > div > div.css-1kivf96 > div > span {
        color: #2A2E45 !important;
    }
  `;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = darkModeStyle;
  styleSheet.id = "dark-mode-styles";

  document.head.appendChild(styleSheet);
}

export function removeDarkMode() {
  const existingStyleSheet = document.getElementById("dark-mode-styles");
  if (existingStyleSheet) {
    existingStyleSheet.remove();
  }
}
