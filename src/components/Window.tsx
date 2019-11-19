import React from "react";

type WindowProps = {
  width: string;
  height?: string;
  children: React.ReactNode;
  background?: string;
  fillHeight?: boolean;
};

export function Window({
  width,
  height,
  children,
  background = "transparent",
  fillHeight = false
}: WindowProps) {
  return (
    <div
      style={{
        width,
        height,
        border: "2px solid #888",
        margin: "2px",
        background,
        ...(fillHeight ? { display: "flex", flex: 1 } : {})
      }}
    >
      {children}
    </div>
  );
}

export default Window;
