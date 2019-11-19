import React, { ReactNode } from "react";

type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";

type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "base-line"
  | "first"
  | "end";

type FlexBox = {
  children: ReactNode;
  width?: string;
  height?: string;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
};

export function Row({
  children,
  width = "auto",
  height = "auto",
  justifyContent = "center",
  alignItems = "center"
}: FlexBox) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width,
        height,
        justifyContent,
        alignItems
      }}
    >
      {children}
    </div>
  );
}

export function Column({
  children,
  width = "auto",
  height = "auto",
  justifyContent = "center",
  alignItems = "center"
}: FlexBox) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width,
        height,
        justifyContent,
        alignItems
      }}
    >
      {children}
    </div>
  );
}
