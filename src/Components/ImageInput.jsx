import React, { useEffect, useState } from "react";

const ImageInput = ({ id, onImageAdd }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    if (image != null) {
      //as there was a immediate need to update onImageAdd , so if we directly use setState and update it will result in stale state , as useStates are updated asynchronously
      console.log("Effect ran because count is:", image);
      const fetcher = async () => {
        const response = await fetch("http://localhost:3000/cloudinary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: image }),
        });
        const data = await response.json();
        console.log(data);
        onImageAdd(id, "image", data.imageURI);
      };
      fetcher();
    }
  }, [image]);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
      // setImage((prevImage) => {
      //   if (prevImage) {
      //     URL.revokeObjectURL(prevImage); //createObjectUrl creates a reference to the browser's memory and this reference is not automatically removed or replaced , so you need to remove it urself incase to prevent memory leakage
      //   }
      //   return imageUrl;
      // });
    }
  };

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <div className="flex  items-center  rounded-lg  mx-auto">
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Preview"
            className="max-w-[72px] h-24 object-cover rounded-lg"
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
