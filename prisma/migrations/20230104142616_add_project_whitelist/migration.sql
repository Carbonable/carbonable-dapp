-- CreateTable
CREATE TABLE "ProjectWhitelist" (
    "id" TEXT NOT NULL,
    "whitelist" JSONB NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "ProjectWhitelist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectWhitelist_projectId_key" ON "ProjectWhitelist"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectWhitelist" ADD CONSTRAINT "ProjectWhitelist_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
