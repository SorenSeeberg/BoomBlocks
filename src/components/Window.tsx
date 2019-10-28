import React from "react";

type WindowProps = {
  width: string;
  height?: string;
  children: React.ReactNode;
  background?: string;
  fillHeight?: boolean;
};

export default function Window({
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
        border: "4px double #888",
        background,
        ...(fillHeight ? { display: "flex", flex: 1 } : {})
      }}
    >
      {children}
    </div>
  );
}
