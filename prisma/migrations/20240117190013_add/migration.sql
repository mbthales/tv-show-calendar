/*
  Warnings:

  - A unique constraint covering the columns `[tvShowId,userId]` on the table `TvShow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tvShowId` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TvShow" ADD COLUMN     "tvShowId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_tvShowId_userId_key" ON "TvShow"("tvShowId", "userId");
