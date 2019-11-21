import React from "react";
import { useSettingsState } from "../context/SettingsContxt";
import { Theme, useTheme } from "../context/ThemeContext";

export function Background({ children }) {
  const { themeName } = useSettingsState();
  const currentTheme: Theme = useTheme()[themeName];

  return <div style={{ background: currentTheme.background }}>{children}</div>;
}
