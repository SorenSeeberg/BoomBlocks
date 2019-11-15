import React, { ReactNode } from "react";
import { useTheme, Theme } from "../context/ThemeContext";
import { useGameState } from "../context/GameContext";

type Header = {
  children: ReactNode;
  padding?: string;
};

export function H1({ children, padding = "0px" }: Header) {
  const { themeName } = useGameState();
  const currentTheme: Theme = useTheme()[themeName];
  return (
    <div
      style={{
        ...currentTheme.baseText,
        fontSize: currentTheme.fontSizes.fontSizeH1,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H2({ children, padding = "0px" }: Header) {
  const { themeName } = useGameState();
  const currentTheme: Theme = useTheme()[themeName];

  return (
    <div
      style={{
        ...currentTheme.baseText,
        fontSize: currentTheme.fontSizes.fontSizeH2,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H3({ children, padding = "0px" }: Header) {
  const { themeName } = useGameState();
  const currentTheme: Theme = useTheme()[themeName];
  return (
    <div
      style={{
        ...currentTheme.baseText,
        fontSize: currentTheme.fontSizes.fontSizeH3,
        padding
      }}
    >
      {children}
    </div>
  );
}
