import React, { useState } from "react";

const ImageInput = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <div className="flex  items-center  rounded-lg w-full mx-auto">
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-full h-24 object-cover rounded-lg"
          />
          <button
            onClick={handleClearImage}
            className="absolute top-0 right-0 bg-black text-white p-[0.10rem] rounded-full shadow hover:bg-blue-600"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center  w-full">
          <label
            htmlFor="image-upload"
            className="cursor-pointer bg-blue-500 text-white p-2 rounded shadow hover:bg-blue-600"
          >
            Choose an Image
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default ImageInput;
