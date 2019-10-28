import React from "react";

export function Row({
  children,
  width = "auto",
  height = "auto",
  justifyContent = "center",
  alignItems = "center"
}) {
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
}) {
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
