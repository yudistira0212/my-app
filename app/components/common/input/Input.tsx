"use client";

import React from "react";

interface InputProps {
  isEdit: boolean;
  value: string;
  onChange: (value: string) => void;
  id: string;
  label: string;
  type?: "text" | "password" | "email" | "number" | "date" | "time";
  inputMode?: "numeric" | "text" | "decimal" | "tel" | "search" | "email";
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  isEdit,
  value,
  onChange,
  id,
  type,
  inputMode,
  placeholder,
}) => {
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor={id} className="block font-bold mb-2">
          {label}
        </label>
        <input
          id={id}
          disabled={isEdit}
          className="w-full text-sm text-gray-900  border-none rounded-lg p-2 focus:outline-[#263159] bg-[#D9D9D9]"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handlerChange}
          inputMode={inputMode}
        />
      </div>
    </div>
  );
};

export default Input;
