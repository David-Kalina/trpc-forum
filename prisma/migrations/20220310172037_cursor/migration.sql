/*
  Warnings:

  - A unique constraint covering the columns `[myCursor]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "myCursor" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Post_myCursor_key" ON "Post"("myCursor");
