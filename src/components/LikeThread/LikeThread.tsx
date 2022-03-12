import { Flex, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { trpc } from 'utils/trpc';

// TODO Work on more efficient cache invalidation. Not sure if invalidating all queries is the best way to go.

function LikeThread({
  id,
  likes,
  liked,
  disliked,
}: {
  id: string;
  likes: number;
  liked: boolean;
  disliked: boolean;
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
    <Flex flexDirection="column" alignSelf="start" alignItems="center">
      <IconButton
        variant="ghost"
        aria-label="upvote"
        color={liked ? 'orange' : 'unset'}
        icon={<FaChevronUp />}
        onClick={() => likePost.mutateAsync({ id })}
      />
      <Text>{likes}</Text>
      <IconButton
        onClick={() => dislikePost.mutateAsync({ id })}
        variant="ghost"
        color={disliked ? 'red' : 'unset'}
        aria-label="downvote"
        icon={<FaChevronDown />}
      />
    </Flex>
  );
}

export default LikeThread;
