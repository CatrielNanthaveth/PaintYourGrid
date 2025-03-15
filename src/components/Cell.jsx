import React from "react";

const Cell = ({ isActive, color, onClick, onContextMenu, onMouseEnter }) => {
  return (
    <div
      className="cell"
      style={{
        backgroundColor: isActive ? color : "white",
      }}
      onClick={onClick}
      onContextMenu={onContextMenu}
      onMouseEnter={onMouseEnter}
    />
  );
};

export default Cell;