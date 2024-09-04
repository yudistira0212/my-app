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
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none    rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-[#263159]"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {isEdit ? <FaLock color="#263159" /> : <FaLockOpen color="#263159" />}
        </span>
      </label>
    </div>
  );
};

export default KontakHeader;
