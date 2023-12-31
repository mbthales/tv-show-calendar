/*
  Warnings:

  - You are about to drop the column `tvShowId` on the `TvShow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `TvShow` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "TvShow_tvShowId_key";

-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "tvShowId";

-- CreateIndex
CREATE UNIQUE INDEX "TvShow_name_key" ON "TvShow"("name");
