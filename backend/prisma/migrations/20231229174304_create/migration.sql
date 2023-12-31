/*
  Warnings:

  - You are about to drop the column `episodes` on the `TvShow` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TvShow` table. All the data in the column will be lost.
  - Added the required column `airDate` to the `TvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `TvShow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TvShow" DROP CONSTRAINT "TvShow_userId_fkey";

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "episodes",
DROP COLUMN "userId",
ADD COLUMN     "airDate" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "poster" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "WatchedTvShow" (
    "id" TEXT NOT NULL,
    "episodes" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "tvShowId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WatchedTvShow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WatchedTvShow_userId_tvShowId_key" ON "WatchedTvShow"("userId", "tvShowId");

-- AddForeignKey
ALTER TABLE "WatchedTvShow" ADD CONSTRAINT "WatchedTvShow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WatchedTvShow" ADD CONSTRAINT "WatchedTvShow_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
