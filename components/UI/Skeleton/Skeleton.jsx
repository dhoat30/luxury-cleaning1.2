import React from "react";

export default function Skeleton({
  height,
  className,
  variant,
  position,
  paddingBottom,
}) {
  let positionValue = position ? position : "relative";
  return (
    <div
      className={`${className} ${
        variant === "dark" ? "dark-skeleton" : "skeleton"
      }`}
      style={{
        position: positionValue,
        paddingBottom: `${paddingBottom}`,
        width: "100%",
        height: `${height}`,
      }}
    ></div>
  );
}
