/*
  Warnings:

  - Added the required column `estimatedAPR` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "estimatedAPR" TEXT NOT NULL;
