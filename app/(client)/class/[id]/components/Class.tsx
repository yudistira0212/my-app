import {
  Class as ClassType,
  Dosen,
  Mahasiswa,
  Mahasiswa_has_class,
} from "@prisma/client";
import moment from "moment";
import React from "react";
import Absen from "./Absen";
import Link from "next/link";
import Image from "next/image";

interface ClassWithRelations extends ClassType {
  dosen: Dosen; // Relation to Dosen
  Mahasiswa_has_class: (Mahasiswa_has_class & {
    mahasiswa: Mahasiswa;
  })[];
}

interface Props {
  dataClass: ClassWithRelations;
}
const Class: React.FC<Props> = ({ dataClass }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-between">
      <div className="p-8 w-full text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">
          {dataClass?.ruangan}
        </h1>
        {/* <p className="text-lg mb-4">PROGRAM STUDI INFORMATIKA</p> */}
        <p className="text-md mb-8">{dataClass?.dosen.nama}</p>
        <p className="text-md mb-8">
          {moment(dataClass?.waktu_mulai).format("YYYY-MM-DD, HH:mm ") +
            " - " +
            moment(dataClass?.waktu_selesai).format("YYYY-MM-DD, HH:mm ")}
        </p>
        <Absen id={Number(dataClass.id)} />
        <div className="flex justify-center space-x-16">
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-4">
              Nama Mahasiswa
            </h2>
            <ul className="text-left">
              {dataClass?.Mahasiswa_has_class.map((value) => (
                <li key={value.mahasiswa.id}>{value.mahasiswa.nama}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-900 mb-4">
              NIM Mahasiswa
            </h2>
            <ul className="text-left">
              {dataClass?.Mahasiswa_has_class.map((value) => (
                <li key={value.mahasiswa.id}>{value.mahasiswa.nim}</li>
              ))}
            </ul>
          </div>
        </div>
        <Link
          href="/home"
          className="bg-blue-900  text-white px-4 py-2 mt-8 rounded-md"
        >
          BACK
        </Link>
      </div>

      <div className="w-full">
        <Image
          src=""
          alt="Gedung"
          width={1479}
          height={251}
          className="w-full"
        />
      </div>

      {/* <div className="bg-white p-8 w-full text-center">
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
    </div> */}
    </div>
  );
};

export default Class;
