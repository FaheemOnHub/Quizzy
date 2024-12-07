import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";

const CustomColorPicker = () => {
  const [color, setColor] = useState("#3498db");
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <button
        style={{
          backgroundColor: color,
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => setShowPicker(!showPicker)}
      >
        Select Color
      </button>

      {showPicker && (
        <div
          style={{ position: "relative", marginTop: "5px" }}
          className="border border-green-500 "
        >
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="border border-red-500"
            onClick={() => setShowPicker(false)}
          />
          <SketchPicker
            color={color}
            onChangeComplete={(updatedColor) => setColor(updatedColor.hex)}
            styles={{
              default: {
                picker: {
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                },
              },
            }}
            disableAlpha
            presetColors={[
              "#3498db",
              "#e74c3c",
              "#2ecc71",
              "#9b59b6",
              "#f1c40f",
              "#34495e",
            ]}
          />
        </div>
      )}

      <p style={{ marginTop: "10px" }}>Selected Color: {color}</p>
    </div>
  );
};

export default CustomColorPicker;
