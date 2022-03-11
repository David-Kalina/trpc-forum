import { Flex, Heading } from '@chakra-ui/react';
import Login from 'components/Login';
import { NextPageWithLayout } from './_app';

const LoginPage: NextPageWithLayout = () => {
  return (
    <Flex
      w="50%"
      mx="auto"
      h="100vh"
      flexDirection="column"
      justify="center"
      align="center"
    >
      <Heading as="h1" size="lg" textAlign="center">
        Login
      </Heading>
      <Login />
    </Flex>
  );
};

export default LoginPage;
