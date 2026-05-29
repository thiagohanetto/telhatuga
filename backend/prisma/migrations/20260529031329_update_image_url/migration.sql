/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Need` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "photoUrl",
ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Need" DROP COLUMN "photoUrl",
ADD COLUMN     "imageUrl" TEXT;
