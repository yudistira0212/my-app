import React from "react";

const PagePengumuman = () => {
  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Input Pengumuman</h1>
        <form action="">
          <div className="flex flex-wrap w-full  bg-white  ">
            <div className="flex flex-col w-full  ">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Judul
                </label>
                <input
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                  type="text"
                  placeholder="Judul"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Gambar
                </label>
                <textarea
                  className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                  placeholder="Gambar"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white bg-[#495579] hover:bg-blue-800  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PagePengumuman;
