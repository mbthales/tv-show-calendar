/*
  Warnings:

  - You are about to drop the `TvShow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WatchedTvShow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WatchedTvShow" DROP CONSTRAINT "WatchedTvShow_tvShowId_fkey";

-- DropForeignKey
ALTER TABLE "WatchedTvShow" DROP CONSTRAINT "WatchedTvShow_userId_fkey";

-- DropTable
DROP TABLE "TvShow";

-- DropTable
DROP TABLE "WatchedTvShow";

-- CreateTable
CREATE TABLE "FavTvShow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "premiered" TEXT NOT NULL,
    "episodes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FavTvShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavTvShow_name_key" ON "FavTvShow"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FavTvShow_userId_name_key" ON "FavTvShow"("userId", "name");

-- AddForeignKey
ALTER TABLE "FavTvShow" ADD CONSTRAINT "FavTvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
