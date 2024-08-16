/*
  Warnings:

  - A unique constraint covering the columns `[nim]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mahasiswa_id` to the `Absen` table without a default value. This is not possible if the table is not empty.
  - Made the column `nama` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nim` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.
  - Made the column `angkatan` on table `Mahasiswa` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Absen" ADD COLUMN     "mahasiswa_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" ALTER COLUMN "nama" SET NOT NULL,
ALTER COLUMN "nim" SET NOT NULL,
ALTER COLUMN "nim" SET DATA TYPE TEXT,
ALTER COLUMN "angkatan" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_nim_key" ON "Mahasiswa"("nim");

-- AddForeignKey
ALTER TABLE "Absen" ADD CONSTRAINT "Absen_mahasiswa_id_fkey" FOREIGN KEY ("mahasiswa_id") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
