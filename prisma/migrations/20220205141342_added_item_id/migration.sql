/*
  Warnings:

  - Added the required column `itemId` to the `Items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items" ADD COLUMN     "itemId" TEXT NOT NULL;
