-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(45),
    "email" VARCHAR(45) NOT NULL,
    "password" VARCHAR(45),
    "role" VARCHAR(45),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pengumuman" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(45),
    "gambar" VARCHAR(45),
    "url_gambar" VARCHAR(45),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Pengumuman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prodi" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(45),
    "deskripsi" VARCHAR(45),
    "visi_misi" VARCHAR(45),
    "sejarah" VARCHAR(45),
    "info_lainnya" VARCHAR(45),
    "logo_prodi" VARCHAR(45),
    "url_logo_prodi" VARCHAR(45),
    "logo_universitas" VARCHAR(45),
    "url_logo_universitas" VARCHAR(45),

    CONSTRAINT "Prodi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dosen" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(45),
    "jabatan" VARCHAR(45),
    "gambar" VARCHAR(45),
    "url_gambar" VARCHAR(45),
    "prodi_id" INTEGER NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(45),
    "sks" VARCHAR(45),
    "waktu_mulai" VARCHAR(45),
    "waktu_selesai" VARCHAR(45),
    "dosen_id" INTEGER NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(45),
    "nim" INTEGER,
    "angkatan" VARCHAR(45),

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa_has_class" (
    "Mahasiswa_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "Mahasiswa_has_class_pkey" PRIMARY KEY ("Mahasiswa_id","class_id")
);

-- CreateTable
CREATE TABLE "Absen" (
    "id" SERIAL NOT NULL,
    "kehadiran" VARCHAR(45),
    "tanggal" VARCHAR(45),
    "class_id" INTEGER NOT NULL,

    CONSTRAINT "Absen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kontak" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(45),
    "telephone" VARCHAR(45),
    "alamat" VARCHAR(45),
    "sosial_media" VARCHAR(45),
    "prodi_id" INTEGER NOT NULL,

    CONSTRAINT "Kontak_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

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
ALTER TABLE "Kontak" ADD CONSTRAINT "Kontak_prodi_id_fkey" FOREIGN KEY ("prodi_id") REFERENCES "Prodi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
