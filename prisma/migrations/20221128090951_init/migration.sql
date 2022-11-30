-- CreateTable
CREATE TABLE "Projects" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "saleIsOpen" BOOLEAN NOT NULL DEFAULT false,
    "isSoldOut" BOOLEAN NOT NULL DEFAULT false,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "contentReady" BOOLEAN NOT NULL DEFAULT false,
    "estimatedAPR" TEXT NOT NULL,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_key" ON "Projects"("slug");
