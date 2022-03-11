import { Flex, VStack, Box, Heading, Button } from '@chakra-ui/react';
import ThreadPreview from 'components/ThreadPreview';
import React from 'react';
import { trpc } from 'utils/trpc';

function BrowseThreads() {
  const { hasNextPage, data, fetchNextPage } = trpc.useInfiniteQuery(
    ['post.infinite', { limit: 1 }],
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor;
      },
    },
  );

  return (
    <>
      <Heading as="h2" size="md">
        Threads & discussions
      </Heading>
      <Flex>
        <VStack align="stretch" flex={3} spacing={6}>
          {data?.pages.map(({ posts, nextCursor }, i) => (
            <React.Fragment key={i}>
              {posts.map((post) => (
                <ThreadPreview key={post.id} post={post} />
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && (
            <Button
              onClick={() => {
                fetchNextPage();
              }}
            >
              Fetch more
            </Button>
          )}
        </VStack>
        <Box ml="3rem" flex={1}>
          Stuff
        </Box>
      </Flex>
    </>
  );
}

export default BrowseThreads;
