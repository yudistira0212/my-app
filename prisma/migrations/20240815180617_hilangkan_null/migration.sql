/*
  Warnings:

  - Made the column `kehadiran` on table `Absen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tanggal` on table `Absen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sks` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `waktu_mulai` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `waktu_selesai` on table `Class` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `Dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jabatan` on table `Dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pendidikan` on table `Dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publikasi` on table `Dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kontak` on table `Dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `text` on table `Pengumuman` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gambar` on table `Pengumuman` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url_gambar` on table `Pengumuman` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `deskripsi` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `visi_misi` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sejarah` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `info_lainnya` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo_prodi` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url_logo_prodi` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `logo_universitas` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `url_logo_universitas` on table `Prodi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Absen" ALTER COLUMN "kehadiran" SET NOT NULL,
ALTER COLUMN "tanggal" SET NOT NULL;

-- AlterTable
ALTER TABLE "Class" ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "sks" SET NOT NULL,
ALTER COLUMN "waktu_mulai" SET NOT NULL,
ALTER COLUMN "waktu_selesai" SET NOT NULL;

-- AlterTable
ALTER TABLE "Dosen" ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "jabatan" SET NOT NULL,
ALTER COLUMN "pendidikan" SET NOT NULL,
ALTER COLUMN "publikasi" SET NOT NULL,
ALTER COLUMN "kontak" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pengumuman" ALTER COLUMN "text" SET NOT NULL,
ALTER COLUMN "gambar" SET NOT NULL,
ALTER COLUMN "url_gambar" SET NOT NULL;

-- AlterTable
ALTER TABLE "Prodi" ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "deskripsi" SET NOT NULL,
ALTER COLUMN "visi_misi" SET NOT NULL,
ALTER COLUMN "sejarah" SET NOT NULL,
ALTER COLUMN "info_lainnya" SET NOT NULL,
ALTER COLUMN "logo_prodi" SET NOT NULL,
ALTER COLUMN "url_logo_prodi" SET NOT NULL,
ALTER COLUMN "logo_universitas" SET NOT NULL,
ALTER COLUMN "url_logo_universitas" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" SET NOT NULL;
