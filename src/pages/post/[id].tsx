import { Avatar, Box, Heading, HStack, Text } from '@chakra-ui/react';
import LikeThread from 'components/LikeThread';
import Replies from 'components/Replies';
import Reply from 'components/Reply';
import NextError from 'next/error';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { trpc } from 'utils/trpc';

const PostViewPage: NextPageWithLayout = () => {
  const id = useRouter().query.id as string;
  const postQuery = trpc.useQuery(['post.byId', { id }]);

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={postQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (postQuery.status !== 'success') {
    return <>Loading...</>;
  }
  const { data } = postQuery;
  return (
    <>
      <Heading as="h1" size="xl">
        {data.title}
      </Heading>
      <HStack>
        <Avatar name={data.createdBy} />
        <Box>
          <Text>{data.createdBy}</Text>
          <em>Created {data.createdAt.toLocaleDateString()}</em>
        </Box>
      </HStack>
      <Text>{data.text}</Text>
      <HStack>
        <LikeThread
          id={data.id}
          likes={data.likes}
          liked={false}
          disliked={false}
        />
        <Reply postId={data.id} />
      </HStack>
      <hr />
      <Replies postId={data.id} />
    </>
  );
};

export default PostViewPage;
