import React from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Trash2 } from "lucide-react";
const ImageUploader = ({ label, image, setImage, maxSizeMB = 10 }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file!");
          return;
        }
        if (file.size > maxSizeMB * 1024 * 1024) {
          alert(`File size exceeds ${maxSizeMB}MB!`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(file);
      }
    },
  });

  const handleClearImage = () => setImage(null);

  return (
    <div className="space-y-6">
      <span className="text-lg font-medium">{label}</span>
      {image ? (
        <div className="flex gap-4">
          <img
            src={image}
            alt={`${label} Preview`}
            className="object-cover rounded-lg w-auto h-36 "
          />
          <div className="">
            <button
              onClick={handleClearImage}
              className="  bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex justify-center items-center p-6 border-2 rounded-lg transition ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center ">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <span className="text-sm text-gray-600 ">
              Drag and drop your image here or{" "}
              <span className="text-blue-500 cursor-pointer">browse files</span>
            </span>
            <p className="text-xs text-gray-500">
              PNG, JPG, GIF up to {maxSizeMB}MB
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
