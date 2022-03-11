/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */

import { createRouter } from 'server/createRouter';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { prisma } from '../prisma';
import {
  checkIfUserDisliked,
  checkIfUserLiked,
  toggleDislike,
  toggleLike,
} from 'server/utils/checkIfUserLiked';

export const postRouter = createRouter()
  // create
  .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string().min(1).max(32),
      text: z.string().min(1),
    }),
    async resolve({ input, ctx }) {
      if (!ctx?.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      const post = await prisma.post.create({
        data: input,
      });
      return post;
    },
  })
  // read
  .query('all', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return prisma.post.findMany({
        select: {
          id: true,
          title: true,
          text: true,
          likes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    },
  })
  .query('infinite', {
    input: z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(),
    }),
    async resolve({ input, ctx }) {
      const limit = input.limit ?? 2;
      const { cursor } = input;
      const posts = await prisma.post.findMany({
        take: limit + 1,
        select: {
          id: true,
          title: true,
          text: true,
          likes: true,
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: 'asc',
        },
      });
      let nextCursor: typeof cursor | null = null;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      const user = ctx?.session?.user?.name;

      const likedOrNotLikedPosts = await Promise.all(
        posts.map(async (post) => {
          return {
            ...post,
            liked: await checkIfUserLiked(user as string, post.id),
          };
        }),
      );

      return {
        posts: likedOrNotLikedPosts,
        nextCursor,
      };
    },
  })
  .query('bySearch', {
    input: z.object({
      search: z.string().min(1),
    }),
    async resolve({ input }) {
      const { search } = input;
      const posts = await prisma.post.findMany({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              text: {
                contains: search,
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
          text: true,
          likes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { posts };
    },
  })
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const post = await prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          text: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No post with id '${id}'`,
        });
      }
      return post;
    },
  })
  // update
  .mutation('edit', {
    input: z.object({
      id: z.string().uuid(),
      data: z.object({
        title: z.string().min(1).max(32).optional(),
        text: z.string().min(1).optional(),
      }),
    }),
    async resolve({ input }) {
      const { id, data } = input;
      const post = await prisma.post.update({
        where: { id },
        data,
      });
      return post;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.post.delete({ where: { id } });
      return id;
    },
  })
  .mutation('like', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx?.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }
      const { id } = input;

      const user = ctx?.session?.user?.name as string;

      const { id: likedId } = await checkIfUserLiked(user, id);

      await toggleLike(user, id as string);

      const post = await prisma.post.update({
        where: { id },
        data: {
          likes:
            (await prisma.postLikes.count({ where: { postId: id } })) -
            (await prisma.postDislikes.count({ where: { postId: id } })),
        },
      });
      return {
        post,
      };
    },
  })
  .mutation('dislike', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      if (!ctx?.session?.user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
        });
      }

      const { id } = input;

      const user = ctx?.session?.user?.name as string;

      const { id: dislikedId } = await checkIfUserDisliked(user as string, id);

      await toggleDislike(user, id as string);

      const post = await prisma.post.update({
        where: { id },
        data: {
          likes:
            (await prisma.postLikes.count({ where: { postId: id } })) -
            (await prisma.postDislikes.count({ where: { postId: id } })),
        },
      });
      return post;
    },
  });
