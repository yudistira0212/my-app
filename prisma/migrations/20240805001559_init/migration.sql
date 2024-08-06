/*
  Warnings:

  - The `waktu_mulai` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `waktu_selesai` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "waktu_mulai",
ADD COLUMN     "waktu_mulai" DATE,
DROP COLUMN "waktu_selesai",
ADD COLUMN     "waktu_selesai" DATE;
