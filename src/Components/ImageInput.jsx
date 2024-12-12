import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Trash2, Upload, ImagePlus, X } from "lucide-react";

const ImageInput = ({ id, onImageAdd }) => {
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (image) {
      const fetcher = async () => {
        setLoading(true);
        try {
          const response = await fetch("http://localhost:3000/cloudinary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ image }),
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
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  const handleClearImage = () => {
    setImage(null);
    onImageAdd(id, "image", null); // Clear the image in the parent component
  };

  return (
    <div className="space-y-4 mx-auto">
      {/* Image Preview */}
      {image ? (
        <div className="relative">
          <img
            src={image}
            alt="Uploaded Preview"
            className="object-cover rounded-lg h-36 w-auto"
          />
          <button
            onClick={handleClearImage}
            className="absolute top-2 right-2 text-black p-[0.20rem] m-2 rounded-full hover:bg-blue-600"
          >
            <Trash2 />
          </button>
        </div>
      ) : (
        <>
          {/* Icon Trigger */}
          <div
            className="w-10 h-10 bg-gray-200 flex items-center justify-center rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <ImagePlus className="text-gray-500" />
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold">Upload Image</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div
                  {...getRootProps()}
                  className={`p-6 border-2 rounded-lg text-center ${
                    isDragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Drag and drop an image here, or click to select one
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-200 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {loading && <div className="text-blue-600">Uploading...</div>}
    </div>
  );
};

export default ImageInput;
