import { Avatar, Box, Button, HStack } from '@chakra-ui/react';
import Search from 'components/Search';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';

function Navigation() {
  const { data: session } = useSession();

  const router = useRouter();

  return (
    <HStack
      pos="fixed"
      bg="white"
      align="center"
      zIndex={999}
      top={0}
      left={0}
      width="100vw"
      px="4em"
      minH="50px"
      justify="space-between"
    >
      <Box>Logo</Box>
      <Box>Forum</Box>
      <Box>About</Box>
      <Search />

      {session?.user ? (
        <>
          <Avatar size="sm" name={session.user?.name as string} />
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      ) : (
        <Button onClick={() => router.push('/login')}>Login</Button>
      )}
    </HStack>
  );
}

export default Navigation;
