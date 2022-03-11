/*
  Warnings:

  - A unique constraint covering the columns `[cursor]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "cursor" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Post_cursor_key" ON "Post"("cursor");
