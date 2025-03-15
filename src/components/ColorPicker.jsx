import React from "react";

const COLORS = ["red", "blue", "green", "yellow", "purple", "beige", "pink", "gray", "black"];

const ColorPicker = ({ x, y, onSelectColor }) => {
  return (
    <div className="color-picker" style={{ top: y, left: x }}>
      {COLORS.map((color) => (
        <div
          key={color}
          className="color-option"
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
