/*
  Warnings:

  - You are about to drop the column `nama` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "nama",
ADD COLUMN     "image" VARCHAR(255),
ADD COLUMN     "image_name" VARCHAR(255),
ADD COLUMN     "name" VARCHAR(255);
