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
// import "react-colorful/dist/index.css";

const CustomizeTab = ({ selectedFont, setSelectedFont }) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  //   const [showPicker, setShowPicker] = useState(false);
  const [showPicker, setShowPicker] = useState({
    questionPicker: false,
    answerPicker: false,
    buttonColorPicker: false,
    buttonTextPicker: false,
  });
  const [customizationSettings, setCustomizationSettings] = useState({
    questionColor: "#000000",
    answerColor: "#000000",
    buttonColor: "#0000ff",
    buttonTextColor: "#C0D6D3",
    backgroundColor: "#ffffff",
    backgroundImage: "",
  });
  console.log(customizationSettings.questionColor);
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
          img.onload = () =>
            console.log(`Width: ${img.width}, Height: ${img.height}`);
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

  const handleClearImage = () => {
    setLogo(null);
    setCustomizationSettings((prev) => ({ ...prev, backgroundImage: "" }));
  };

  const handleColorChange = (key, value) => {
    setCustomizationSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 font-montserrat">
        Branding Options
      </h1>

      {/* Branding Options */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="adding-logo-div"
      >
        {/* Logo Upload */}
        <div className="space-y-4 mx-auto">
          <h2 className="text-lg font-medium text-gray-700">Logo</h2>
          {logo ? (
            <div className="relative">
              <img
                src={logo}
                alt="Uploaded Preview"
                className="object-cover rounded-lg"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-2 right-2 text-black p-[0.20rem] m-2 rounded-full hover:bg-blue-600"
              >
                Remove
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <input {...getInputProps()} />
                  <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
          {loading && <div className="text-blue-600">Uploading...</div>}
        </div>

        {/* Font Selection */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-700">Font</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={selectedFont}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => loadFont(e.target.value)}
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
        </div>
      </div>

      {/* Customization Options */}
      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-medium text-gray-700">Customization</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* questionPicker */}
          <div style={{ fontFamily: selectedFont, padding: "10px" }}>
            <button
              style={{
                backgroundColor: customizationSettings.questionColor,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              className="min-w-[150px]"
              onClick={() =>
                setShowPicker((prev) => ({
                  ...prev,
                  questionPicker: !prev.questionPicker,
                }))
              }
            >
              Question Color
            </button>
            {showPicker.questionPicker && (
              <div style={{ position: "relative", marginTop: "5px" }}>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  onClick={() =>
                    setShowPicker((prev) => ({
                      ...prev,
                      questionPicker: false,
                    }))
                  }
                />
                <HexColorPicker
                  color={customizationSettings.questionColor}
                  onChange={(color) =>
                    handleColorChange("questionColor", color)
                  }
                  className="z-[999]"
                />
              </div>
            )}
          </div>
          {/* answerPicker */}
          <div style={{ fontFamily: selectedFont, padding: "10px" }}>
            <button
              style={{
                backgroundColor: customizationSettings.answerColor,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() =>
                setShowPicker((prev) => ({
                  ...prev,
                  answerPicker: !prev.answerPicker,
                }))
              }
            >
              Answer Color
            </button>
            {showPicker.answerPicker && (
              <div style={{ position: "relative", marginTop: "5px" }}>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  onClick={() =>
                    setShowPicker((prev) => ({
                      ...prev,
                      answerPicker: false,
                    }))
                  }
                />
                <HexColorPicker
                  className="z-[999]"
                  color={customizationSettings.answerColor}
                  onChange={(color) => handleColorChange("answerColor", color)}
                />
              </div>
            )}
          </div>
          {/* buttonsColor */}
          <div style={{ fontFamily: selectedFont, padding: "10px" }}>
            <button
              style={{
                backgroundColor: customizationSettings.buttonColor,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              className="min-w-[160px]"
              onClick={() =>
                setShowPicker((prev) => ({
                  ...prev,
                  buttonColorPicker: !prev.buttonColorPicker,
                }))
              }
            >
              Button
            </button>
            {showPicker.buttonColorPicker && (
              <div style={{ position: "relative", marginTop: "5px" }}>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  onClick={() =>
                    setShowPicker((prev) => ({
                      ...prev,
                      buttonColorPicker: false,
                    }))
                  }
                />
                <HexColorPicker
                  className="z-[999]"
                  color={customizationSettings.buttonColor}
                  onChange={(color) => handleColorChange("buttonColor", color)}
                />
              </div>
            )}
          </div>
          {/* buttonTextColor */}
          <div style={{ fontFamily: selectedFont, padding: "10px" }}>
            <button
              style={{
                backgroundColor: customizationSettings.buttonTextColor,
                color: "#fff",
                border: "none",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              className="min-w-[160px]"
              onClick={() =>
                setShowPicker((prev) => ({
                  ...prev,
                  buttonTextPicker: !prev.buttonTextPicker,
                }))
              }
            >
              Buttons Text
            </button>
            {showPicker.buttonTextPicker && (
              <div style={{ position: "relative", marginTop: "5px" }}>
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                  onClick={() =>
                    setShowPicker((prev) => ({
                      ...prev,
                      buttonTextPicker: false,
                    }))
                  }
                />
                <HexColorPicker
                  className="z-[999]"
                  color={customizationSettings.buttonTextColor}
                  onChange={(color) =>
                    handleColorChange("buttonTextColor", color)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTab;
