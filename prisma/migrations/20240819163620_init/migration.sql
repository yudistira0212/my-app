-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255),
    "image_name" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "gambar" VARCHAR(255) NOT NULL,
    "url_gambar" VARCHAR(255) NOT NULL,
    "aktif" BOOLEAN,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prodi" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "visi" TEXT,
    "misi" TEXT,
    "tujuan" TEXT,
    "sejarah" TEXT,
    "info_lainnya" TEXT,
    "logo_prodi" VARCHAR(255) NOT NULL,
    "url_logo_prodi" VARCHAR(255) NOT NULL,
    "logo_universitas" VARCHAR(255) NOT NULL,
    "url_logo_universitas" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prodi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dosen" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jabatan" VARCHAR(255) NOT NULL,
    "pendidikan" VARCHAR(255) NOT NULL,
    "biografi" VARCHAR(255),
    "publikasi" VARCHAR(255) NOT NULL,
    "kontak" VARCHAR(255) NOT NULL,
    "url_gambar" VARCHAR(255),
    "gambar" VARCHAR(255),
    "prodi_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "sks" INTEGER NOT NULL,
    "ruangan" TEXT NOT NULL,
    "waktu_mulai" TIMESTAMP(3) NOT NULL,
    "waktu_selesai" TIMESTAMP(3) NOT NULL,
    "dosen_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "nim" TEXT NOT NULL,
    "angkatan" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa_has_class" (
    "Mahasiswa_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mahasiswa_has_class_pkey" PRIMARY KEY ("Mahasiswa_id","class_id")
);

-- CreateTable
CREATE TABLE "Absen" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "mahasiswa_id" INTEGER NOT NULL,
    "waktu_absen" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Absen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kontak" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255),
    "telephone" VARCHAR(255),
    "alamat" VARCHAR(255),
    "sosial_media" VARCHAR(255),
    "prodi_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kontak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- AddForeignKey
ALTER TABLE "Pengumuman" ADD CONSTRAINT "Pengumuman_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen" ADD CONSTRAINT "Dosen_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "Prodi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_dosen_id_fkey" FOREIGN KEY ("dosen_id") REFERENCES "Dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa_has_class" ADD CONSTRAINT "Mahasiswa_has_class_Mahasiswa_id_fkey" FOREIGN KEY ("Mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa_has_class" ADD CONSTRAINT "Mahasiswa_has_class_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absen" ADD CONSTRAINT "Absen_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "Class"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Absen" ADD CONSTRAINT "Absen_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kontak" ADD CONSTRAINT "Kontak_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "Prodi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
