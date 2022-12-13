-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "contentReady" BOOLEAN NOT NULL DEFAULT false,
    "estimatedAPR" TEXT NOT NULL,
    "minterContract" TEXT NOT NULL,
    "isDisplay" BOOLEAN NOT NULL DEFAULT false,
    "imageIpfs" TEXT NOT NULL,
    "networkId" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "nodeUrl" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_minterContract_key" ON "Project"("minterContract");

-- CreateIndex
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Network_chainId_key" ON "Network"("chainId");

-- CreateIndex
CREATE UNIQUE INDEX "Network_nodeUrl_key" ON "Network"("nodeUrl");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
