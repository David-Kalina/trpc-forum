import { Flex, Heading } from '@chakra-ui/react';
import Register from 'components/Register';
import { NextPageWithLayout } from './_app';

const RegisterPage: NextPageWithLayout = () => {
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
        Register
      </Heading>
      <Register />
    </Flex>
  );
};

export default RegisterPage;
