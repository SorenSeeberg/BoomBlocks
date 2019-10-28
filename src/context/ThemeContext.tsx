import React, { useContext } from "react";

export type Theme = {
  tetroColors: string[];
  fontFamilyGlobal: string;
};

const themeValues = {
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
  fontFamilyGlobal: "monospace"
};

const themeContext: React.Context<Theme> = React.createContext(themeValues);

export function ThemeProvider({ children }) {
  return (
    <themeContext.Provider value={useContext(themeContext)}>
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  return useContext(themeContext);
}
