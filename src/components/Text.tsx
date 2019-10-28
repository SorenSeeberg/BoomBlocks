import React, { ReactNode } from "react";
import { STYLES } from "../constants";

type Header = {
  children: ReactNode;
  padding?: string;
};

export function H1({ children, padding = "0px" }: Header) {
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH1,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H2({ children, padding = "0px" }: Header) {
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH2,
        padding
      }}
    >
      {children}
    </div>
  );
}

export function H3({ children, padding = "0px" }: Header) {
  return (
    <div
      style={{
        color: STYLES.fontColorInfo,
        fontSize: STYLES.fontSizeH3,
        padding
      }}
    >
      {children}
    </div>
  );
}
