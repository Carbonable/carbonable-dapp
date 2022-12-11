-- CreateEnum
CREATE TYPE "AnalyticsType" AS ENUM ('YIELD', 'OFFSET');

-- CreateTable
CREATE TABLE "SimulatorConfig" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    CONSTRAINT "SimulatorConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SimulatorAnalytics" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" "AnalyticsType" NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "SimulatorAnalytics_pkey" PRIMARY KEY ("id")
);

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

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "SimulatorConfig_type_key" ON "SimulatorConfig"("type");

-- CreateIndex
CREATE UNIQUE INDEX "Projects_slug_key" ON "Projects"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Badge_tokenid_key" ON "Badges"("token_id");

