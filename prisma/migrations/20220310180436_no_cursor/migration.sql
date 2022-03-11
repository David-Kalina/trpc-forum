/*
  Warnings:

  - You are about to drop the column `cursor` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `myCursor` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_cursor_key";

-- DropIndex
DROP INDEX "Post_myCursor_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "cursor",
DROP COLUMN "myCursor";
