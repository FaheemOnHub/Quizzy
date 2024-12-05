import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";

const CustomizeTab = ({ selectedFont, setSelectedFont }) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadFont = (font) => {
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(
      " ",
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    console.log(link);
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
          img.onload = () => {
            console.log(`Width: ${img.width}, Height: ${img.height}`);
          };
          img.src = e.target.result;
          setLogo(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });
  const handleClearImage = () => {
    setLogo(null);
  };
  return (
    <div className=" rounded-lg">
      <h1 className="text-2xl font-semibold  mb-6 font-montserrat">
        Branding Options
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        id="adding-logo-div"
      >
        <div className="space-y-4 mx-auto">
          <h2 className=" text-lg font-medium text-gray-700">Logo</h2>
          {logo ? (
            <div className="relative">
              <img
                src={logo}
                alt="Uploaded Preview"
                className="object-cover rounded-lg"
              />
              <button
                onClick={handleClearImage}
                className="absolute top-2 right-2 text-black p-[0.20rem] m-2 rounded-full  hover:bg-blue-600"
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
        <div className="space-y-4  ">
          <h2 className="text-lg font-medium text-gray-700 ">Font</h2>
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
    </div>
  );
};

export default CustomizeTab;
