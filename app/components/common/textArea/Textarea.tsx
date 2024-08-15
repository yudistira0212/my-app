"use client";

import React from "react";

interface TextareaProps {
  isEdit: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
  id: string;
  classTextarea?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  isEdit,
  value,
  onChange,
  placeholder = "Deskripsi",
  label,
  id,
  classTextarea,
}) => {
  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 font-bold mb-2">
        {label}
      </label>
      <textarea
        id={id}
        disabled={isEdit}
        className={`w-full h-32 text-sm text-gray-900   rounded-lg p-2  focus:outline-[#263159] bg-[#D9D9D9] ${classTextarea}`}
        placeholder={placeholder}
        value={value}
        onChange={handlerChange}
      />
    </div>
  );
};

export default Textarea;
