import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { trpc } from 'utils/trpc';

// TODO Work on more efficient cache invalidation. Not sure if invalidating all queries is the best way to go.

function LikeThread({
  id,
  likes,
  userLiked,
}: {
  id: string;
  likes: number;
  userLiked: boolean;
}) {
  const utils = trpc.useContext();

  const likePost = trpc.useMutation(['post.like'], {
    async onSuccess() {
      utils.invalidateQueries(['post.infinite']);
    },
  });

  const dislikePost = trpc.useMutation('post.dislike', {
    async onSuccess() {
      await utils.invalidateQueries(['post.infinite']);
    },
  });

  return (
    <Flex flexDirection="column" align="center">
      <IconButton
        variant="ghost"
        aria-label="upvote"
        icon={<FaChevronUp />}
        onClick={() => likePost.mutateAsync({ id })}
      />
      <Text>{likes}</Text>
      <IconButton
        onClick={() => dislikePost.mutateAsync({ id })}
        variant="ghost"
        aria-label="downvote"
        icon={<FaChevronDown />}
      />
    </Flex>
  );
}

export default LikeThread;
