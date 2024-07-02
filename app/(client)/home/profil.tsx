// components/ProdiProfile.tsx

import React from "react";

const Profil = () => {
  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-center text-3xl font-bold mb-8 text-blue-900">
        PROFIL PRODI TEKNIK INFORMATIKA
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">VISI MISI</h2>
          <p className="mb-4">
            <strong>Visi</strong>
            <br />
            Pada tahun 2026 menjadi program studi yang unggul dan terpercaya di
            tanah Papua dan Nasional yang mampu menghasilkan riset di bidang
            sistem cerdas, manajemen informasi, dan jaringan komputer yang
            berkontribusi pada konservasi dan menghasilkan lulusan yang berdaya
            saing serta berkarakter wirausaha.
          </p>
          <p className="mb-4">
            <strong>Misi</strong>
            <ol className="list-decimal ml-5">
              <li>
                Untuk mendukung visi tersebut, misi yang diemban oleh program
                studi S1 Teknik Informatika adalah:
              </li>
              <li>
                Menyelenggarakan pendidikan dan pembelajaran yang berkualitas
                sesuai dengan perkembangan IPTEK berlandaskan jiwa nasionalisme
                dan wirausaha.
              </li>
              <li>
                Melaksanakan penelitian secara inovatif dan mandiri yang
                berwawasan konservasi yang mampu mendorong peningkatan publikasi
                dan HKI.
              </li>
              <li>
                Menyelenggarakan pengabdian pada masyarakat dengan
                mengimplementasikan hasil penelitian untuk mendukung kemandirian
                dan kesejahteraan masyarakat di tanah Papua dan kelestarian
                lingkungan.
              </li>
            </ol>
          </p>
          <p className="mb-4">
            <strong>Tujuan</strong>
            <ol className="list-decimal ml-5">
              <li>
                Menghasilkan lulusan yang dapat berkompetisi secara global dan
                mampu berwawasan wirausaha.
              </li>
              <li>
                Pengembangan kualitas penelitian dosen dan mahasiswa pada ranah
                sistem cerdas, manajemen informasi, dan jaringan komputer yang
                dapat disebarluaskan secara nasional dan internasional.
              </li>
              <li>
                Pemberdayaan masyarakat di bidang teknologi informasi dan sistem
                cerdas dalam upaya kesejahteraan masyarakat di tanah Papua
                secara khusus dan Indonesia secara umum.
              </li>
            </ol>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            PROFIL SINGKAT TEKNIK INFORMATIKA
          </h2>
          <p className="mb-4">
            Program studi Teknik Informatika adalah program pendidikan perguruan
            tinggi yang berfokus pada bidang teknologi informasi, dengan tujuan
            mengembangkan pengetahuan, ilmu, dan keahlian dalam sistem cerdas,
            manajemen informasi, dan jaringan komputer. Program studi ini
            menawarkan kurikulum yang dirancang untuk memberikan pemahaman
            mendalam tentang teori dan aplikasi teknologi informasi serta
            keterampilan praktis yang dibutuhkan dalam industri teknologi
            informasi.
          </p>
          <p className="mb-4">
            Di Universitas Papua, Program Studi Teknik Informatika didukung oleh
            fasilitas yang memadai, seperti laboratorium komputer yang modern,
            perpustakaan yang lengkap, serta dosen-dosen yang berkualitas dan
            berpengalaman di bidangnya. Mahasiswa program studi ini juga
            didorong untuk berpartisipasi dalam kegiatan penelitian dan
            pengabdian kepada masyarakat yang dapat mengembangkan potensi
            akademik dan profesional mereka.
          </p>
          <p>
            Dengan visi dan misi yang jelas, Program Studi Teknik Informatika
            Universitas Papua berkomitmen untuk menghasilkan lulusan yang
            unggul, berdaya saing, dan memiliki jiwa wirausaha yang tinggi,
            sehingga mampu memberikan kontribusi yang signifikan dalam
            perkembangan teknologi informasi untuk mendukung pembangunan
            nasional dan kesejahteraan masyarakat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profil;
