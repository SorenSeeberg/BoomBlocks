import React, { useContext, createContext, Context } from "react";

export type ThemeName = "arcade" | "soviet";

export type Theme = {
  tetroColors: string[];
  baseText: {
    fontFamily: string;
    color: string;
    textShadow: string;
    transition: string;
  };
  fontFamilyGlobal: string;
  fontColorMain: string;
  fontSizes: {
    fontSizeH1: string;
    fontSizeH2: string;
    fontSizeH3: string;
  };
};

const themeArcade: Theme = {
  tetroColors: [
    "black",
    "cyan",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "red",
    "transparent"
  ],
  baseText: {
    fontFamily: '"Share Tech Mono", monospace',
    color: "white",
    textShadow: "",
    transition: "font-size 1s"
  },
  fontFamilyGlobal: '"Share Tech Mono", monospace',
  fontColorMain: "white",
  fontSizes: { fontSizeH1: "50px", fontSizeH2: "35px", fontSizeH3: "28px" }
};

const themeSoviet: Theme = {
  tetroColors: [
    "black",
    "cyan",
    "blue",
    "orange",
    "yellow",
    "green",
    "purple",
    "red",
    "transparent"
  ],
  baseText: {
    fontFamily: '"Share Tech Mono", monospace',
    color: "#85ffc7",
    textShadow: "0 0 16px #00c372, 0 0 5px #00c372",
    transition: "font-size 1s"
  },
  fontFamilyGlobal: '"Share Tech Mono", monospace',
  fontColorMain: "#09ffbb",
  fontSizes: { fontSizeH1: "50px", fontSizeH2: "35px", fontSizeH3: "28px" }
};

export type Themes = {
  arcade: Theme;
  soviet: Theme;
};

const themes: Themes = { arcade: themeArcade, soviet: themeSoviet };

const ThemeContext: Context<Themes> = createContext<Themes>(themes);

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): Themes {
  return useContext(ThemeContext);
}
