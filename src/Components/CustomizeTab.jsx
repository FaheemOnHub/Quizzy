//using react-colorful

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, BadgeX } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import ImageUploader from "./ImageUploader";

const CustomizeTab = ({
  setcurrenState,
  selectedFont,
  setSelectedFont,
  customization,
  setCustomization,
}) => {
  const defaultSettings = {
    questionColor: "#000000",
    answerColor: "#000000",
    buttonColor: "#007BFF",
    buttonTextColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    backgroundImage: "",
  };

  const [logo, setLogo] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activePicker, setActivePicker] = useState(null);
  const [customizationSettings, setCustomizationSettings] =
    useState(defaultSettings);

  // Load selected font
  const loadFont = (font) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setCustomization((prev) => ({ ...prev, selectedFont: `${font}` }));
  };

  // Drag and drop for logo upload
  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   accept: { "image/*": [] },
  //   onDrop: (acceptedFiles) => {
  //     const file = acceptedFiles[0];
  //     if (file) {
  //       if (!file.type.startsWith("image/")) {
  //         alert("Please upload a valid image file!");
  //         return;
  //       }
  //       if (file.size > 10 * 1024 * 1024) {
  //         alert("File size exceeds 10MB!");
  //         return;
  //       }

  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const img = new Image();
  //         img.src = e.target.result;
  //         setLogo(e.target.result);
  //         setCustomizationSettings((prev) => ({
  //           ...prev,
  //           backgroundImage: e.target.result,
  //         }));
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   },
  // });

  // Clear uploaded logo
  const handleClearImage = () => {
    setLogo(null);
    setCustomizationSettings((prev) => ({ ...prev, backgroundImage: "" }));
  };

  // Handle color changes
  const handleColorChange = (key, value) => {
    setCustomization((prev) => ({ ...prev, [key]: value }));
  };

  // Reset to default settings
  const handleReset = () => {
    setLogo(null);
    setCustomizationSettings(defaultSettings);
  };

  // Toggle color picker visibility
  const togglePicker = (picker) => {
    setActivePicker(activePicker === picker ? null : picker);
  };

  return (
    <div className="rounded-lg relative">
      <h1 className="text-2xl font-semibold mb-6 font-montserrat">
        Branding Options
      </h1>
      <button
        className="absolute top-1 right-1 "
        onClick={() => setcurrenState("sidebar")}
      >
        <BadgeX />
      </button>
      {/* Real-Time Preview */}
      {/* <div
        className="p-4 border rounded-lg mb-6"
        style={{
          backgroundColor: customizationSettings.backgroundColor,
          fontFamily: selectedFont,
        }}
      >
        <h2 className="text-lg font-bold mb-2">Live Preview</h2>
        <p style={{ color: customizationSettings.questionColor }}>
          Sample Question: What is your favorite color?
        </p>
        <button
          style={{
            backgroundColor: customizationSettings.buttonColor,
            color: customizationSettings.buttonTextColor,
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            marginTop: "10px",
          }}
        >
          Sample Button
        </button>
      </div> */}
      <div className="flex flex-row flex-wrap gap-4 justify-center">
        {/* Logo Upload */}
        <ImageUploader
          label="Logo"
          image="logo"
          // setImage={setLogo}
          {...{ setCustomization }}
          className="flex-1"
        />

        {/* Background Image Upload */}
        <ImageUploader
          label="Background Image"
          image="backgroundImage"
          {...{ setCustomization }}
          className="flex-1"
        />
      </div>

      {/* Font Selection */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-medium">Font</h2>
        <select
          value={selectedFont}
          className="w-full px-3 py-2 border rounded-lg"
          onChange={(e) => loadFont(e.target.value)}
          aria-label="Font Picker"
        >
          <option value="sans">Sans-serif</option>
          <option value="serif">Serif</option>
          <option value="mono">Monospace</option>
          <option value="Roboto">Roboto</option>
          <option value="Poppins">Poppins</option>
          <option value="Lato">Lato</option>
          <option value="Yuji Mai">Yuji Mai</option>
          <option value="Edu AU VIC WA NT Arrows">
            Edu AU VIC WA NT Arrows
          </option>
        </select>
      </div>
      {activePicker && (
        <div
          className="fixed top-0 bottom-0 right-0 left-0 "
          onClick={() => setActivePicker(null)}
        ></div>
      )}

      {/* Color Pickers */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        {[
          { label: "Question Color", key: "primaryTextColor" },
          { label: "Answer Color", key: "answerBackground" },
          { label: "Button Color", key: "buttonsColor" },
          { label: "Form Background", key: "bgColor" },
        ].map(({ label, key }) => (
          <div key={key}>
            <button
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 flex items-center justify-between"
              onClick={() => togglePicker(key)}
            >
              {label}
              <span
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: customization[key] }}
              />
            </button>
            {activePicker === key && (
              <HexColorPicker
                color={customization[key]}
                onChange={(color) => handleColorChange(key, color)}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Reset to Defaults
      </button>
    </div>
  );
};

export default CustomizeTab;
