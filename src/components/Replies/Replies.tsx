import { VStack } from '@chakra-ui/react';
import React from 'react';
import { trpc } from 'utils/trpc';

function Replies({ postId }: { postId: string }) {
  const { data } = trpc.useQuery(['post.replies', { id: postId }]);

  console.log('DATA', data);

  return (
    <VStack>
      {data?.map((reply) => (
        <div key={reply.id}>{reply.text}</div>
      ))}
    </VStack>
  );
}

export default Replies;
