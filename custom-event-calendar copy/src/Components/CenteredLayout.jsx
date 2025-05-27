import React from "react";

const CenteredLayout = ({ children }) => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 56px)", // Adjust if your navbar height differs
        width: "100vw",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f7", // Full viewport background color
        padding: "20px",
        boxSizing: "border-box",
        position: "relative",
        left: 0,
        top: 0,
      }}
    >
      <div style={{ width: "100%", maxWidth: 700 }}>{children}</div>
    </div>
  );
};

export default CenteredLayout;
