-- CreateTable
CREATE TABLE "TvShow" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "episodes" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "premiered" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvShow_pkey" PRIMARY KEY ("id")
);
