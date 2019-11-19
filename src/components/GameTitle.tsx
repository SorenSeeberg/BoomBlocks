import React from "react";
import { Header } from "./Text";
import { useHistory } from "react-router-dom";

export function GameTitle() {
  const history = useHistory();
  const { pathname } = history.location;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: pathname === "/game" ? "60px" : "140px",
        width: "100vw",
        transition: "height .25s",
        background: "black",
        marginBottom: pathname === "/game" ? "0" : "60px"
      }}
    >
      <Header fontSize={pathname === "/game" ? "50px" : "80px"}>
        Boom Blocks
      </Header>
    </div>
  );
}
