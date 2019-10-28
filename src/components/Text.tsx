import React, { ReactNode } from "react";
import { STYLES } from "../constants";
import { Theme, useTheme } from "../context/ThemeContext";

type Header = {
  children: ReactNode;
  padding?: string;
};

export function H1({ children, padding = "0px" }: Header) {
  const theme: Theme = useTheme();
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH1,
        fontFamily: theme.fontFamilyGlobal,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H2({ children, padding = "0px" }: Header) {
  const theme: Theme = useTheme();
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH2,
        fontFamily: theme.fontFamilyGlobal,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H3({ children, padding = "0px" }: Header) {
  const theme: Theme = useTheme();
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH3,
        fontFamily: theme.fontFamilyGlobal,
        padding
      }}
    >
      {children}
    </div>
  );
}
