-- CreateTable
CREATE TABLE "Disco" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "featurings" TEXT[],
    "descriptionP1" TEXT NOT NULL,
    "descriptionP2" TEXT,
    "descriptionP3" TEXT,
    "descriptionP4" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Disco_pkey" PRIMARY KEY ("id")
);
