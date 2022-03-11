import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import LikeThread from 'components/LikeThread';
import React from 'react';

function ThreadPreview({
  post,
}: {
  post: {
    id: string;
    text: string;
    title: string;
    likes: number;
    liked: boolean;
  };
}) {
  return (
    <Flex
      flex={1}
      minH="250px"
      borderRadius="md"
      boxShadow="md"
      p="4"
      border="1px solid grey"
    >
      <LikeThread liked={post.liked} id={post.id} likes={post.likes} />
      <VStack align="stretch" ml="2rem">
        <HStack>
          <Avatar size="sm" />
          <Text fontSize="sm">posted by John Doe</Text>
        </HStack>
        <Text fontWeight="bold" size="md">
          {post.title}
        </Text>
        <Text fontSize="sm">{post.text}</Text>
      </VStack>
    </Flex>
  );
}

export default ThreadPreview;
