"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import Judul from "@/app/components/style/Judul";
import { Prodi } from "@prisma/client";

const DashboardUtama = () => {
  const [namaProdi, setNamaProdi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [visiMisi, setVisiMisi] = useState("");
  const [sejarah, setSejarah] = useState("");
  const [infoLainnya, setInfoLainnya] = useState("");
  const [logoProdiNama, setLogoProdiNama] = useState("");
  const [logoProdiUrl, setLogoProdiUrl] = useState("");
  const [logoUniversitasNama, setLogoUniversitasNama] = useState("");
  const [logoUniversitasUrl, setLogoUniversitasUrl] = useState("");

  const [logoProdi, setLogoProdi] = useState<File | null>(null);
  const [logoProdiPreview, setLogoProdiPreview] = useState("");
  const [logoUniversitas, setLogoUniversitas] = useState<File | null>(null);
  const [logoUniversitasPreview, setLogoUniversitasPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // State tambahan untuk indikator loading saat submit
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(true);

  const [dataProdi, setDataProdi] = useState<Prodi>();

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {
    setLoading(true); // Set loading to true at the start of data fetching
    try {
      const response = await axios.get(`/api/prodi/1`);

      const data = response.data;

      setNamaProdi(data.nama);
      setDeskripsi(data.deskripsi);
      setVisiMisi(data.visi_misi);
      setSejarah(data.sejarah);
      setInfoLainnya(data.info_lainnya);
      setLogoProdiUrl(data.url_logo_prodi);
      setLogoUniversitasUrl(data.url_logo_universitas);
      setLogoProdiNama(data.logo_prodi);
      setLogoUniversitasNama(data.logo_universitas);

      // console.log(response.data);

      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error fetching Prodi:", error);
      setError("Failed to fetch Prodi");
    } finally {
      setLoading(false); // Set loading to false once fetching is complete
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting to true at the start of data submission

    try {
      let logoProdiName = logoProdiNama;
      let logoProdiURL = logoProdiUrl;

      let logoUniversitasName = logoUniversitasNama;
      let logoUniversitasURL = logoUniversitasUrl;

      if (logoProdi) {
        const rute = "utama/prodi";
        const updateResult = await updateImage(rute, logoProdiName, logoProdi);

        if (!updateResult) {
          alert("Failed to update image Prodi");
          return;
        }
        logoProdiName = updateResult.namaImage;
        logoProdiURL = updateResult.url;
      }

      if (logoUniversitas) {
        const rute = "utama/universitas";
        const updateResult = await updateImage(
          rute,
          logoUniversitasName,
          logoUniversitas
        );

        if (!updateResult) {
          alert("Failed to update image Prodi");
          return;
        }
        logoUniversitasName = updateResult.namaImage;
        logoUniversitasURL = updateResult.url;
      }

      let response = null;
      const cekData = await axios.get(`/api/prodi`);
      if (cekData.data.length === 0) {
        response = await axios.post(`/api/prodi`, {
          nama: namaProdi,
          deskripsi,
          visi_misi: visiMisi,
          sejarah,
          info_lainnya: infoLainnya,
          logo_prodi: logoProdiName,
          url_logo_prodi: logoProdiURL,
          logo_universitas: logoUniversitasName,
          url_logo_universitas: logoUniversitasURL,
        });
      } else {
        response = await axios.patch(`/api/prodi/1`, {
          nama: namaProdi,
          deskripsi,
          visi_misi: visiMisi,
          sejarah,
          info_lainnya: infoLainnya,
          logo_prodi: logoProdiName,
          url_logo_prodi: logoProdiURL,
          logo_universitas: logoUniversitasName,
          url_logo_universitas: logoUniversitasURL,
        });
      }

      if (response.status == 200 || 201) {
        setIsEdit(false);
        fetchProdi();
        setError(""); // Clear any previous error
        console.log("Data berhasil disimpan!");
      } else {
        console.error("Gagal menyimpan data.");
        setError("Failed to save data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError("An error occurred during submission.");
    } finally {
      setSubmitting(false); // Set submitting to false once submission is complete
    }
  };

  return (
    <div>
      <div className="flex flex-col bg-white p-4">
        {error && ( // Conditionally render error message
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}
        {loading ? ( // Conditionally render loading spinner
          <div className="flex justify-center items-center h-64">
            <svg
              className="animate-spin h-10 w-10 text-gray-500"
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
          </div>
        ) : (
          <>
            <div>
              <Judul text=" Data Pordi" level={1} />
            </div>
            <div className="flex gap-1 items-center">
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
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
              {isEdit ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 1 C 9.5425419 1 7.4302219 2.5041568 6.5 4.6484375 A 1.0001 1.0001 0 1 0 8.3339844 5.4433594 C 8.9637625 3.9916401 10.353458 3 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 6 8 C 4.9 8 4 8.9 4 10 L 4 20 C 4 21.1 4.9 22 6 22 L 18 22 C 19.1 22 20 21.1 20 20 L 20 10 C 20 8.9 19.1 8 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"></path>
                </svg>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex gap-8 w-full bg-white">
                <div className="flex flex-col items-center w-fit ">
                  <div className="w-fit">
                    <label
                      htmlFor="logoProdi"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Prodi
                    </label>
                    <label htmlFor="logoProdi">
                      <div className="flex flex-col items-center">
                        <img
                          className=" bg-gray-200 rounded-lg"
                          src={logoProdiPreview || logoProdiUrl}
                          alt="logo prodi"
                          width={200}
                          height={200}
                        />
                        <input
                          id="logoProdi"
                          disabled={isEdit}
                          className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-double"
                          type="file"
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              setLogoProdi,
                              setLogoProdiPreview
                            )
                          }
                          hidden
                        />
                      </div>
                    </label>
                  </div>
                  <div className="w-fit">
                    <label className="block text-gray-700 font-bold mb-2">
                      Universitas
                    </label>
                    <label htmlFor="logoUniversitas">
                      <div className="flex flex-col items-center">
                        <img
                          className=" bg-gray-200 rounded-lg"
                          src={logoUniversitasPreview || logoUniversitasUrl}
                          alt="logo universitas"
                          width={200}
                          height={200}
                        />
                        <input
                          id="logoUniversitas"
                          disabled={isEdit}
                          className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-double"
                          type="file"
                          onChange={(e) =>
                            handleFileChange(
                              e,
                              setLogoUniversitas,
                              setLogoUniversitasPreview
                            )
                          }
                          hidden
                        />
                      </div>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col w-full ">
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Nama Program Studi
                    </label>
                    <input
                      disabled={isEdit}
                      className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-double bg-gray-50"
                      type="text"
                      placeholder="Nama Program Studi"
                      value={namaProdi}
                      onChange={(e) => setNamaProdi(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">
                      Deskripsi
                    </label>
                    <textarea
                      disabled={isEdit}
                      className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-double bg-gray-50"
                      placeholder="Deskripsi"
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full bg-white p-4">
                <h1 className="text-2xl font-bold mb-6">Input Visi Misi</h1>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Visi Misi
                  </label>
                  <textarea
                    disabled={isEdit}
                    className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-double bg-gray-50"
                    placeholder="Visi Misi"
                    value={visiMisi}
                    onChange={(e) => setVisiMisi(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Sejarah Singkat Prodi
                  </label>
                  <textarea
                    disabled={isEdit}
                    className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-double bg-gray-50"
                    placeholder="Sejarah Singkat Prodi"
                    value={sejarah}
                    onChange={(e) => setSejarah(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2">
                    Informasi Lainnya
                  </label>
                  <textarea
                    disabled={isEdit}
                    className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-double bg-gray-50"
                    placeholder="Informasi Lainnya"
                    value={infoLainnya}
                    onChange={(e) => setInfoLainnya(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isEdit || loading || submitting} // Disable button when submitting or loading
                  className="text-white disabled:opacity-50 bg-[#495579] hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                  {submitting ? ( // Conditionally render button text based on submitting state
                    <span className="flex items-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
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
                      Memproses...
                    </span>
                  ) : (
                    "Simpan"
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardUtama;
