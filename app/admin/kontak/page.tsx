import React from "react";

const PageKontak = () => {
  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <div>
          <h1 className="text-2xl font-bold mb-6">Input Kontak</h1>
        </div>

        <form action="">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email Podi
            </label>
            <input
              className="w-full  text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Masukan Email Prodi"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Telephon Prodi
            </label>
            <input
              className="w-full  text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Masukan Telephon Prodi"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Alamat Prodi
            </label>
            <input
              className="w-full  text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Masukan Alamat Prodi"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Url Sosial Media
            </label>
            <input
              className="w-full  text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Masukan Jabatan"
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
        </form>
      </div>
    </div>
  );
};

export default PageKontak;
