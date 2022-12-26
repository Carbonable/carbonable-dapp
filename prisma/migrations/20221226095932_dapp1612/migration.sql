-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "name" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Snapshot" (
    "id" TEXT NOT NULL,
    "snapshotDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Snapshot_pkey" PRIMARY KEY ("id")
);

-- RenameIndex
ALTER INDEX "Badge_tokenid_key" RENAME TO "Badges_token_id_key";
