// import React, { useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { Upload } from "lucide-react";
// import { SketchPicker } from "react-color";

// const CustomizeTab = ({ selectedFont, setSelectedFont }) => {
//   const [logo, setLogo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [displayColorPicker, setDisplayColorPicker] = useState(false);
//   const [customizationSettings, setCustomizationSettings] = useState({
//     questionColor: "#000000",
//     answerColor: "#000000",
//     buttonColor: "#0000ff",
//     buttonTextColor: "#ffffff",
//     backgroundColor: "#ffffff",
//     backgroundImage: "",
//   });

//   //loading the font dynamically...
//   const loadFont = (font) => {
//     const link = document.createElement("link");
//     link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
//       " ",
//       "+"
//     )}&display=swap`;
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//     console.log(link);
//     setSelectedFont(font);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: { "image/*": [] },
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (file) {
//         if (!file.type.startsWith("image/")) {
//           alert("Please upload a valid image file!");
//           return;
//         }
//         if (file.size > 10 * 1024 * 1024) {
//           alert("File size exceeds 10MB!");
//           return;
//         }

//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const img = new Image();
//           img.onload = () => {
//             console.log(`Width: ${img.width}, Height: ${img.height}`);
//           };
//           img.src = e.target.result;
//           setLogo(e.target.result);
//           setCustomizationSettings((prev) => ({
//             ...prev,
//             backgroundImage: e.target.result,
//           }));
//         };
//         reader.readAsDataURL(file);
//       }
//     },
//   });

//   const handleClearImage = () => {
//     setLogo(null);
//     setCustomizationSettings((prev) => ({ ...prev, backgroundImage: "" }));
//   };

//   const handleColorChange = (key, color) => {
//     setCustomizationSettings((prev) => ({ ...prev, [key]: color.hex }));
//   };

//   return (
//     <div className="rounded-lg">
//       <h1 className="text-2xl font-semibold mb-6 font-montserrat">
//         Branding Options
//       </h1>

//       {/* Branding Options */}
//       <div
//         className="grid grid-cols-1 md:grid-cols-2 gap-6"
//         id="adding-logo-div"
//       >
//         {/* Logo Upload */}
//         <div className="space-y-4 mx-auto">
//           <h2 className="text-lg font-medium text-gray-700">Logo</h2>
//           {logo ? (
//             <div className="relative">
//               <img
//                 src={logo}
//                 alt="Uploaded Preview"
//                 className="object-cover rounded-lg"
//               />
//               <button
//                 onClick={handleClearImage}
//                 className="absolute top-2 right-2 text-black p-[0.20rem] m-2 rounded-full hover:bg-blue-600"
//               >
//                 Remove
//               </button>
//             </div>
//           ) : (
//             <div
//               {...getRootProps()}
//               className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${
//                 isDragActive
//                   ? "border-blue-500 bg-blue-50"
//                   : "border-gray-300 hover:border-gray-400"
//               }`}
//             >
//               <div className="space-y-1 text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="flex text-sm text-gray-600">
//                   <input {...getInputProps()} />
//                   <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
//                     <span>Upload a file</span>
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-gray-500">
//                   PNG, JPG, GIF up to 10MB
//                 </p>
//               </div>
//             </div>
//           )}
//           {loading && <div className="text-blue-600">Uploading...</div>}
//         </div>

//         {/* Font Selection */}
//         <div className="space-y-4">
//           <h2 className="text-lg font-medium text-gray-700">Font</h2>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Font Family
//             </label>
//             <select
//               value={selectedFont}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//               onChange={(e) => loadFont(e.target.value)}
//             >
//               <option value="sans">Sans-serif</option>
//               <option value="serif">Serif</option>
//               <option value="mono">Monospace</option>
//               <option value="Roboto">Roboto</option>
//               <option value="Poppins">Poppins</option>
//               <option value="Lato">Lato</option>
//               <option value="Yuji Mai">Yuji Mai</option>
//               <option value="Edu AU VIC WA NT Arrows">
//                 Edu AU VIC WA NT Arrows
//               </option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Customization Options */}
//       <div className="mt-6 space-y-4">
//         <h2 className="text-lg font-medium text-gray-700">Customization</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Question Color
//             </label>
//             <SketchPicker
//               color={customizationSettings.questionColor}
//               onChange={(color) => handleColorChange("questionColor", color)}
//               styles={{
//                 default: {
//                   picker: {},
//                   alpha: {
//                     display: "none", // Hide the alpha (transparency) slider
//                   },
//                 },
//               }}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Answer Color
//             </label>
//             <SketchPicker
//               color={customizationSettings.answerColor}
//               onChange={(color) => handleColorChange("answerColor", color)}
//               styles={{
//                 alpha: {
//                   display: "none",
//                 },
//               }}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Button Color
//             </label>
//             <SketchPicker
//               color={customizationSettings.buttonColor}
//               onChange={(color) => handleColorChange("buttonColor", color)}
//               styles={{
//                 alpha: {
//                   display: "none",
//                 },
//               }}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Button Text Color
//             </label>
//             <SketchPicker
//               color={customizationSettings.buttonTextColor}
//               onChange={(color) => handleColorChange("buttonTextColor", color)}
//               styles={{
//                 alpha: {
//                   display: "none",
//                 },
//                 input: {
//                   border: "1px solid #ccc", // Customize the input field
//                 },
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomizeTab;

//using react-colorful

import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { HexColorPicker } from "react-colorful";

const CustomizeTab = ({ selectedFont, setSelectedFont }) => {
  const defaultSettings = {
    questionColor: "#000000",
    answerColor: "#000000",
    buttonColor: "#007BFF",
    buttonTextColor: "#FFFFFF",
    backgroundColor: "#FFFFFF",
    backgroundImage: "",
  };

  const [logo, setLogo] = useState(null);
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
    setSelectedFont(font);
  };

  // Drag and drop for logo upload
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file!");
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert("File size exceeds 10MB!");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          setLogo(e.target.result);
          setCustomizationSettings((prev) => ({
            ...prev,
            backgroundImage: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    },
  });

  // Clear uploaded logo
  const handleClearImage = () => {
    setLogo(null);
    setCustomizationSettings((prev) => ({ ...prev, backgroundImage: "" }));
  };

  // Handle color changes
  const handleColorChange = (key, value) => {
    setCustomizationSettings((prev) => ({ ...prev, [key]: value }));
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
    <div className="rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 font-montserrat">
        Branding Options
      </h1>

      {/* Real-Time Preview */}
      <div
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
      </div>

      {/* Logo Upload */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Logo</h2>
        {logo ? (
          <div className="relative ">
            <img
              src={logo}
              alt="Uploaded Preview"
              className="object-cover rounded-lg w-auto h-36 "
            />
            <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              Remove
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`flex justify-center items-center p-6 border-2 rounded-lg transition ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-sm text-gray-600">
                Drag and drop your logo here or{" "}
                <span className="text-blue-500 cursor-pointer">
                  browse files
                </span>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )}
      </div>
      {/* Background-Image */}

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
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[
          { label: "Question Color", key: "questionColor" },
          { label: "Answer Color", key: "answerColor" },
          { label: "Button Color", key: "buttonColor" },
          { label: "Button Text Color", key: "buttonTextColor" },
        ].map(({ label, key }) => (
          <div key={key}>
            <button
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 flex items-center justify-between"
              onClick={() => togglePicker(key)}
            >
              {label}
              <span
                className="w-5 h-5 rounded-full border"
                style={{ backgroundColor: customizationSettings[key] }}
              />
            </button>
            {activePicker === key && (
              <HexColorPicker
                color={customizationSettings[key]}
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
