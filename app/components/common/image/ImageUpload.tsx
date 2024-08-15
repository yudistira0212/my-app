"use client";

import React from "react";

interface ImageUploadProps {
  id: string;
  label: string;
  isEdit: boolean;
  fileUrl: string;
  filePreview: string;
  onFileChange: (file: File, preview: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  id,
  label,
  isEdit,
  fileUrl,
  filePreview,
  onFileChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onFileChange(file, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-fit">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <label htmlFor={id}>
        <div className="flex flex-col items-center">
          <img
            className="bg-gray-200 rounded-lg"
            src={filePreview || fileUrl}
            alt={`preview ${label}`}
            width={200}
            height={200}
          />
          <input
            id={id}
            disabled={isEdit}
            className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-double"
            type="file"
            onChange={handleChange}
            hidden
          />
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;
