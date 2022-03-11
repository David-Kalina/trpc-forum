import { prisma } from '../prisma';

export async function checkIfUserLiked(user: string, postId: string) {
  const userLiked = await prisma.postLikes.findFirst({
    where: { user, postId },
  });

  return { alreadyLiked: !!userLiked, id: userLiked?.id };
}

export async function checkIfUserDisliked(user: string, postId: string) {
  const userDisliked = await prisma.postDislikes.findFirst({
    where: { user, postId },
  });

  return { alreadyDisliked: !!userDisliked, id: userDisliked?.id };
}

export async function toggleLike(user: string, postId: string) {
  const { alreadyLiked, id } = await checkIfUserLiked(user, postId);
  if (alreadyLiked && postId) {
    await prisma.postLikes.delete({
      where: {
        id,
      },
    });
  } else {
    await prisma.postLikes.create({
      data: {
        post: { connect: { id: postId } },
        user: user as string,
      },
    });
  }
}

export async function toggleDislike(user: string, postId: string) {
  const { alreadyDisliked, id } = await checkIfUserDisliked(user, postId);

  if (alreadyDisliked) {
    await prisma.postDislikes.delete({
      where: {
        id,
      },
    });
  } else {
    await prisma.postDislikes.create({
      data: {
        post: { connect: { id: postId } },
        user: user as string,
      },
    });
  }
}
