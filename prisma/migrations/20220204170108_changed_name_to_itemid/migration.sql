/*
  Warnings:

  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - Added the required column `itemid` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "name",
ADD COLUMN     "itemid" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
