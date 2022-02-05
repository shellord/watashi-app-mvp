/*
  Warnings:

  - You are about to drop the column `image` on the `Items` table. All the data in the column will be lost.
  - Added the required column `media_type` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster_path` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "image",
ADD COLUMN     "media_type" TEXT NOT NULL,
ADD COLUMN     "poster_path" TEXT NOT NULL;
