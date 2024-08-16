/*
  Warnings:

  - The `sks` column on the `Class` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "sks",
ADD COLUMN     "sks" INTEGER NOT NULL DEFAULT 0;
