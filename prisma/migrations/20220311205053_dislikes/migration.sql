-- CreateTable
CREATE TABLE "PostDislikes" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "PostDislikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostDislikes" ADD CONSTRAINT "PostDislikes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
