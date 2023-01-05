/*
  Warnings:

  - You are about to drop the column `name` on the `Badge` table. All the data in the column will be lost.
  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Badge" DROP COLUMN "name",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name1" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name2" TEXT NOT NULL DEFAULT '';


-- CreateTable
CREATE TABLE "BadgeContract" (
    "id" TEXT NOT NULL,
    "minter" TEXT NOT NULL,
    "badge" TEXT NOT NULL,
    "networkId" TEXT NOT NULL,

    CONSTRAINT "BadgeContract_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BadgeContract_networkId_key" ON "BadgeContract"("networkId");

-- AddForeignKey
ALTER TABLE "BadgeContract" ADD CONSTRAINT "BadgeContract_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
