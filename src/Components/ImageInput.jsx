import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react"; // Replace with your preferred icon library

const ImageInput = ({ id, onImageAdd }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image != null) {
      const fetcher = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:3000/cloudinary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image: image }),
          });
          const data = await response.json();
          onImageAdd(id, "image", data.imageURI);
        } catch (error) {
          console.error("Image upload failed", error);
        } finally {
          setLoading(false);
        }
      };
      fetcher();
    }
  }, [image]);

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
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleClearImage = () => {
    setImage(null);
  };

  return (
    <div className="space-y-4 mx-auto">
      {image ? (
        <div className="relative">
          <img
            src={image}
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
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      )}
      {loading && <div className="text-blue-600">Uploading...</div>}
    </div>
  );
};

export default ImageInput;
