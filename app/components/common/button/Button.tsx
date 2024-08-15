"use client";

import React from "react";
import Loading from "../loading/Loading";

interface ButtonProps {
  isEdit?: boolean;
  loading?: boolean;
  submitting?: boolean;
  text: string;
  textLoading?: string;
  type?: "button" | "submit" | "reset" | undefined;
}
const Button: React.FC<ButtonProps> = ({
  isEdit,
  loading,
  submitting,
  text,
  textLoading,
  type,
}) => {
  return (
    <button
      type={type}
      disabled={isEdit || loading || submitting} // Disable button when submitting or loading
      className="text-white disabled:opacity-50 disabled:cursor-not-allowed bg-[#495579] hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <div>{textLoading}</div>
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
