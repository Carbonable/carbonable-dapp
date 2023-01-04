-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "mintable" BOOLEAN NOT NULL DEFAULT false,
    "token_id" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BadgeWhitelist" (
    "id" TEXT NOT NULL,
    "whitelist" JSONB NOT NULL,

    CONSTRAINT "BadgeWhitelist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Badge_token_id_key" ON "Badge"("token_id");

-- CreateIndex
CREATE UNIQUE INDEX "BadgeWhitelist_whitelist_key" ON "BadgeWhitelist"("whitelist");
