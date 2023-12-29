/*
  Warnings:

  - You are about to drop the `Episodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TvShows` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Episodes" DROP CONSTRAINT "Episodes_tvShowId_fkey";

-- DropForeignKey
ALTER TABLE "Episodes" DROP CONSTRAINT "Episodes_userId_fkey";

-- DropForeignKey
ALTER TABLE "TvShows" DROP CONSTRAINT "TvShows_userId_fkey";

-- DropTable
DROP TABLE "Episodes";

-- DropTable
DROP TABLE "TvShows";

-- CreateTable
CREATE TABLE "TvShow" (
    "id" TEXT NOT NULL,
    "tvShowId" TEXT NOT NULL,
    "episodes" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_tvShowId_key" ON "TvShow"("tvShowId");

-- AddForeignKey
ALTER TABLE "TvShow" ADD CONSTRAINT "TvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
