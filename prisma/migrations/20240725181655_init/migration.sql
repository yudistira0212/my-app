/*
  Warnings:

  - You are about to drop the column `gambar` on the `Dosen` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dosen" DROP COLUMN "gambar",
ADD COLUMN     "biografi" VARCHAR(255),
ADD COLUMN     "kontak" VARCHAR(255),
ADD COLUMN     "pendidikan" VARCHAR(255);
