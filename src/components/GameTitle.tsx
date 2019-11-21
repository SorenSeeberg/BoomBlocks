import React from "react";
import { Title } from "./Text";
import { useHistory } from "react-router-dom";
import { useSettingsState } from "../context/SettingsContxt";
import { useTheme } from "../context/ThemeContext";

export function GameTitle() {
  const history = useHistory();
  const { pathname } = history.location;
  const { themeName } = useSettingsState();
  const theme = useTheme()[themeName];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: pathname === "/game" ? "60px" : "140px",
        width: "100vw",
        transition: "height .25s",
        background: theme.backgroundTopBar,
        marginBottom: pathname === "/game" ? "0" : "60px"
      }}
    >
      <Title
        fontSize={
          pathname === "/game" ? theme.font.size.h1 : theme.font.size.title
        }
      >
        Boom Blocks
      </Title>
    </div>
  );
}
