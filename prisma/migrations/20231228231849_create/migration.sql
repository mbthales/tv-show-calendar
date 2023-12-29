-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TvShows" (
    "id" TEXT NOT NULL,
    "tvShowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TvShows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Episodes" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "isWatched" BOOLEAN NOT NULL DEFAULT false,
    "tvShowId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Episodes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "TvShows_tvShowId_key" ON "TvShows"("tvShowId");

-- AddForeignKey
ALTER TABLE "TvShows" ADD CONSTRAINT "TvShows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episodes" ADD CONSTRAINT "Episodes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episodes" ADD CONSTRAINT "Episodes_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "TvShows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
