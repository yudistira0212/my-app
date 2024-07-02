import React from "react";

const Tes = () => {
  return (
    <div>
      <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-6">Input Data Prodi</h1>
        <div className="flex flex-wrap w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center w-full sm:w-1/3 p-2">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Logo Prodi
              </label>
              <div className="flex flex-col items-center">
                <img
                  className="h-32 w-32 bg-gray-200 rounded-lg mb-2"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="logo prodi"
                />
                <input
                  className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  type="file"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Logo Universitas
              </label>
              <div className="flex flex-col items-center">
                <img
                  className="h-32 w-32 bg-gray-200 rounded-lg mb-2"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="logo universitas"
                />
                <input
                  className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-2/3 p-2">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Nama Program Studi
              </label>
              <input
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                type="text"
                placeholder="Nama Program Studi"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Deskripsi
              </label>
              <textarea
                className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                placeholder="Deskripsi"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tes;
