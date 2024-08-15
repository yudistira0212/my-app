import React from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";

const KontakHeader = ({ isEdit, setIsEdit }: any) => {
  return (
    <div className="flex gap-1 items-center mb-4">
      <h1 className="text-2xl font-bold">Input Kontak</h1>
      <label
        htmlFor="isEdit"
        className="inline-flex items-center cursor-pointer"
      >
        <input
          checked={isEdit}
          onChange={(e) => setIsEdit(e.target.checked)}
          type="checkbox"
          className="sr-only peer"
          id="isEdit"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue-600"></div>
      </label>
      {isEdit ? <FaLock color="#263159" /> : <FaLockOpen color="#263159" />}
    </div>
  );
};

export default KontakHeader;
