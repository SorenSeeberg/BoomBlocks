import React from "react";
import { useSettingsState } from "../context/SettingsContxt";
import { Theme, useTheme } from "../context/ThemeContext";

type WindowProps = {
  width: string;
  height?: string;
  children: React.ReactNode;
  fillHeight?: boolean;
};

export function Window({
  width,
  height,
  children,
  fillHeight = false
}: WindowProps) {
  const { themeName } = useSettingsState();
  const theme: Theme = useTheme()[themeName];

  return (
    <div
      style={{
        width,
        height,
        boxShadow: "inset 0 0 10px #00000070",
        border: theme.window.border,
        margin: "2px",
        background: theme.window.background,
        ...(fillHeight ? { display: "flex", flex: 1 } : {})
      }}
    >
      {children}
    </div>
  );
}

export default Window;
