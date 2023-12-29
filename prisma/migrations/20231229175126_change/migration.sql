/*
  Warnings:

  - You are about to drop the column `airDate` on the `TvShow` table. All the data in the column will be lost.
  - Added the required column `premiered` to the `TvShow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TvShow" DROP COLUMN "airDate",
ADD COLUMN     "premiered" TEXT NOT NULL;
