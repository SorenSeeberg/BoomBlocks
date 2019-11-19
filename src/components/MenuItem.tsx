import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useGameState } from "../context/GameContext";
import { useTheme } from "../context/ThemeContext";

type MenuItemProps = {
  children: ReactNode;
  linkTo?: string;
  displayValue?: string | number;
  onClick?: () => void;
  type?: "link" | "option";
};

export function MenuItem({
  children,
  linkTo,
  onClick,
  displayValue,
  type = "link"
}: MenuItemProps) {
  const { themeName } = useGameState();
  const theme = useTheme()[themeName];
  return (
    <>
      {type === "link" ? (
        <Link to={linkTo} style={{ textDecoration: "none", width: "100vw" }}>
          <button className="menu-item" onClick={onClick}>
            {children}
          </button>
        </Link>
      ) : (
        <button className="menu-item" onClick={onClick}>
          <div
            style={{
              display: "flex",
              width: "600px",
              justifyContent: "flex-end"
            }}
          >
            {`${children}:`}
          </div>
          <div style={{ display: "flex", width: "500px", paddingLeft: "80px" }}>
            {`[${displayValue}]`}
          </div>
        </button>
      )}

      <style>
        {`
      .menu-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 80px;
        cursor: pointer;
        font-size: ${theme.fontSizes.fontSizeH2};
        font-family: ${theme.baseText.fontFamily};
        text-shadow: ${theme.baseText.textShadow};
        color: ${theme.baseText.color};
        background: transparent;
        border: none;
        transition: color .25s, font-size .25s;
      }

      .menu-item:focus,
      .menu-item:hover {
        font-size: 45px;
        color: white;
        outline: none;
        background: radial-gradient(circle, ${theme.baseText.color}30 0%, ${
          theme.baseText.color
        }00 100%);
      }
     `}
      </style>
    </>
  );
}
