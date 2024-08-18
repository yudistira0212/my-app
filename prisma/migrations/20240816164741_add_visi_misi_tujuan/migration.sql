/*
  Warnings:

  - You are about to drop the column `visi_misi` on the `Prodi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prodi" DROP COLUMN "visi_misi",
ADD COLUMN     "misi" TEXT,
ADD COLUMN     "tujuan" TEXT,
ADD COLUMN     "visi" TEXT,
ALTER COLUMN "sejarah" DROP NOT NULL,
ALTER COLUMN "info_lainnya" DROP NOT NULL;
