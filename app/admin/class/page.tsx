import React from "react";

const PageClass = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <h1 className="text-3xl font-bold mb-8">Input Class</h1>
      <div className="w-full   p-6">
        <h2 className="text-xl font-semibold mb-4">Class Data</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg flex items-center justify-center"
              >
                <label htmlFor={`classInput${index}`} className="sr-only">
                  Isi Class
                </label>
                <input
                  id={`classInput${index}`}
                  type="text"
                  placeholder="Isi Class"
                  className="bg-gray-200 text-center border-none  focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Selanjutnya...</span>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageClass;
