/*
  Warnings:

  - You are about to drop the column `isSoldOut` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Projects` table. All the data in the column will be lost.
  - You are about to drop the column `saleIsOpen` on the `Projects` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[minterContract]` on the table `Projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `minterContract` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "isSoldOut",
DROP COLUMN "name",
DROP COLUMN "saleIsOpen",
ADD COLUMN     "isDisplay" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "minterContract" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Projects_minterContract_key" ON "Projects"("minterContract");
