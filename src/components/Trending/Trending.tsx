import { Heading, HStack } from '@chakra-ui/react';
import Banner from 'components/Banner';
import React from 'react';

function Trending() {
  return (
    <>
      <Heading as="h1" size="md">
        Trending Today
      </Heading>
      <HStack>
        <Banner />
        <Banner />
        <Banner />
        <Banner />
      </HStack>
    </>
  );
}

export default Trending;
