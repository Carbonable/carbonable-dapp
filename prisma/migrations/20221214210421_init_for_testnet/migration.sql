-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "contentReady" BOOLEAN NOT NULL DEFAULT false,
    "estimatedAPR" TEXT NOT NULL,
    "minterContract" TEXT NOT NULL,
    "projectContract" TEXT NOT NULL,
    "yielderContract" TEXT NOT NULL,
    "offseterContract" TEXT NOT NULL,
    "vesterContract" TEXT NOT NULL,
    "paymentContract" TEXT NOT NULL,
    "paymentTokenDecimals" INTEGER NOT NULL,
    "paymentTokenSymbol" TEXT NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "maxBuyPerTx" INTEGER NOT NULL,
    "maxSupplyForMint" INTEGER NOT NULL,
    "isDisplay" BOOLEAN NOT NULL DEFAULT false,
    "imageIpfs" TEXT NOT NULL,
    "networkId" TEXT NOT NULL,
    "whitelistedSaleOpen" BOOLEAN NOT NULL DEFAULT false,
    "publicSaleOpen" BOOLEAN NOT NULL DEFAULT false,

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

-- CreateTable
CREATE TABLE "Badges" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "mintable" BOOLEAN NOT NULL DEFAULT false,
    "token_id" INTEGER NOT NULL,

    CONSTRAINT "Badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Network_chainId_key" ON "Network"("chainId");

-- CreateIndex
CREATE UNIQUE INDEX "Network_nodeUrl_key" ON "Network"("nodeUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Badges_tokenid_key" ON "Badges"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "Badges_name_key" ON "Badges"("name");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "Badge_tokenid_key" ON "Badges"("token_id");
