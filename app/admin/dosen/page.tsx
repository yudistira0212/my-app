import React from "react";

const PageDosen = () => {
  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Input Data Prodi</h1>
        <div className="flex flex-wrap w-full  bg-white  ">
          <div className="flex flex-col items-center w-full sm:w-1/3 ">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Foto</label>
              <div className="flex flex-col items-center">
                <img
                  className="h-32 w-32 bg-gray-200 rounded-lg mb-2"
                  src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                  alt="Foto Dosen"
                />
                <input
                  className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  type="file"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full sm:w-2/3 ">
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Nama</label>
              <input
                className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                type="text"
                placeholder="Masukan Nama"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Jabaran
              </label>
              <input
                className="w-full  text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                placeholder="Masukan Jabatan"
              />
            </div>
          </div>
        </div>
        <div>
          <h2> List Dosen</h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Jabatan
                  </th>
                  <th scope="col" className="px-6 py-3">
                    FOto
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td className="px-6 py-4">Silver</td>
                  <td className="px-6 py-4">Laptop</td>
                  <td className="px-6 py-4">$2999</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Microsoft Surface Pro
                  </th>
                  <td className="px-6 py-4">White</td>
                  <td className="px-6 py-4">Laptop PC</td>
                  <td className="px-6 py-4">$1999</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Magic Mouse 2
                  </th>
                  <td className="px-6 py-4">Black</td>
                  <td className="px-6 py-4">Accessories</td>
                  <td className="px-6 py-4">$99</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr className="odd:bg-white  even:bg-gray-50  border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Google Pixel Phone
                  </th>
                  <td className="px-6 py-4">Gray</td>
                  <td className="px-6 py-4">Phone</td>
                  <td className="px-6 py-4">$799</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    Apple Watch 5
                  </th>
                  <td className="px-6 py-4">Red</td>
                  <td className="px-6 py-4">Wearables</td>
                  <td className="px-6 py-4">$999</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageDosen;
