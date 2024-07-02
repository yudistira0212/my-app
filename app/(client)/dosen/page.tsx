import Image from "next/image";
import React from "react";

const PageDosen = () => {
  return (
    <div>
      {" "}
      <div className="bg-[#fefbf3] min-h-screen flex flex-col items-center justify-between p-8">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row">
          <div className="md:w-1/3 flex flex-col items-center">
            <Image
              src="/images/profil.jpg"
              alt="Christian Dwi Suhendra"
              width={200}
              height={200}
              className="rounded-full mb-4"
            />
            <h2 className="text-xl font-bold mb-2">CHRISTIAN DWI SUHENDRA</h2>
            <h3 className="text-lg mb-4">S.T., M.Cs</h3>
            <h4 className="text-md mb-4">
              Dosen / Koordinator Teknik Informatika
            </h4>
            <div className="text-left">
              <h4 className="text-lg font-bold mb-2">Pendidikan</h4>
              <ul className="list-disc list-inside mb-4">
                <li>
                  S.T
                  <br />
                  Universitas Sains Dan Teknologi Manokwari, 2010
                </li>
                <li>
                  M.Cs
                  <br />
                  Universitas Gadjah Mada, 2016
                </li>
              </ul>
              <h4 className="text-lg font-bold mb-2">Contact</h4>
              <p>christian.dwi@unipa.ac.id</p>
            </div>
          </div>
          <div className="md:w-2/3 md:ml-8">
            <h3 className="text-lg font-bold mb-2">Biography</h3>
            <p className="mb-4">
              Christian Dwi Suhendra, S.T., M.Cs adalah seorang dosen di Program
              Studi Informatika Universitas Papua. Beliau menyelesaikan gelar
              Sarjana Teknik di Universitas Sains dan Teknologi Manokwari pada
              tahun 2010, dan melanjutkan pendidikan Magister di bidang Ilmu
              Komputer di Universitas Gadjah Mada pada tahun 2016.
            </p>
            <h3 className="text-lg font-bold mb-2">Publikasi Ilmiah</h3>
            <ul className="list-disc list-inside">
              <li>
                Suhendra, C.D., & Example, A.B. (2020). Judul Penelitian 1. Nama
                Jurnal, Volume(Issue), Pages.
              </li>
              <li>
                Suhendra, C.D., & Example, C.D. (2019). Judul Penelitian 2. Nama
                Jurnal, Volume(Issue), Pages.
              </li>
              <li>
                Suhendra, C.D., & Example, E.F. (2018). Judul Penelitian 3. Nama
                Jurnal, Volume(Issue), Pages.
              </li>
            </ul>
          </div>
        </div>

        <button className="bg-blue-900 text-white px-4 py-2 mt-8 rounded-md">
          BACK
        </button>
      </div>
    </div>
  );
};

export default PageDosen;
