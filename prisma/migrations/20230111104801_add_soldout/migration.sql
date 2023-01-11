/*
  Warnings:

  - You are about to drop the `Badges` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX IF EXISTS "BadgeWhitelist_whitelist_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isSoldout" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE IF EXISTS "Badges";
