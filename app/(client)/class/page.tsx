import Image from "next/image";
import React from "react";

const PageClass = () => {
  return (
    <div>
      {" "}
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-between">
        <div className="p-8 w-full text-center">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            DI RUANG TEKNIK 8
          </h1>
          <p className="text-lg mb-4">PROGRAM STUDI INFORMATIKA</p>
          <p className="text-md mb-8">Christian Dwi Suhendra, S.T., M.Cs.</p>
          <p className="text-md mb-8">Jam 09.00 - 10.40</p>
          <div className="flex justify-center space-x-16">
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-4">
                Nama Mahasiswa
              </h2>
              <ul className="text-left">
                <li>1. A</li>
                <li>2. B</li>
                <li>3. C</li>
                <li>4. D</li>
                <li>5. E</li>
                <li>6. F</li>
                <li>7. G</li>
                <li>8. H</li>
                <li>9. I</li>
                <li>10. J</li>
                <li>11. K</li>
                <li>12. L</li>
                <li>13. M</li>
                <li>14. N</li>
                <li>15. O</li>
                <li>16. P</li>
                <li>17. Q</li>
                <li>18. R</li>
                <li>19. S</li>
                <li>20. T</li>
                <li>21. U</li>
                <li>22. V</li>
                <li>23. W</li>
                <li>24. X</li>
                <li>25. Y</li>
                <li>26. Z</li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-blue-900 mb-4">
                NIM Mahasiswa
              </h2>
              <ul className="text-left">
                <li>1. A</li>
                <li>2. B</li>
                <li>3. C</li>
                <li>4. D</li>
                <li>5. E</li>
                <li>6. F</li>
                <li>7. G</li>
                <li>8. H</li>
                <li>9. I</li>
                <li>10. J</li>
                <li>11. K</li>
                <li>12. L</li>
                <li>13. M</li>
                <li>14. N</li>
                <li>15. O</li>
                <li>16. P</li>
                <li>17. Q</li>
                <li>18. R</li>
                <li>19. S</li>
                <li>20. T</li>
                <li>21. U</li>
                <li>22. V</li>
                <li>23. W</li>
                <li>24. X</li>
                <li>25. Y</li>
                <li>26. Z</li>
              </ul>
            </div>
          </div>
          <button className="bg-blue-900 text-white px-4 py-2 mt-8 rounded-md">
            BACK
          </button>
        </div>

        <div className="w-full">
          <Image
            src="/images/gedung.jpg"
            alt="Gedung"
            width={1479}
            height={251}
            className="w-full"
          />
        </div>

        <div className="bg-white p-8 w-full text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            TERHUBUNG DENGAN KAMI :
          </h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <img
                src="/path/to/phone-icon.png"
                alt="Phone"
                className="w-6 h-6 mr-2"
              />
              <span>(0986) 214245</span>
            </div>
            <div className="flex items-center">
              <img
                src="/path/to/email-icon.png"
                alt="Email"
                className="w-6 h-6 mr-2"
              />
              <span>prodi.s1informatika@unipa.ac.id</span>
            </div>
            <div className="flex items-center">
              <img
                src="/path/to/instagram-icon.png"
                alt="Instagram"
                className="w-6 h-6 mr-2"
              />
              <span>@teknik_informatika_unipa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageClass;
