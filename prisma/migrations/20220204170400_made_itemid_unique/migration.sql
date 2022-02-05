/*
  Warnings:

  - A unique constraint covering the columns `[itemid]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Item_itemid_key" ON "Item"("itemid");
