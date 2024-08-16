/*
  Warnings:

  - You are about to drop the column `kehadiran` on the `Absen` table. All the data in the column will be lost.
  - You are about to drop the column `tanggal` on the `Absen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Absen" DROP COLUMN "kehadiran",
DROP COLUMN "tanggal";
