import { Flex, Text, Image, Box } from '@chakra-ui/react';
import React from 'react';

function Banner() {
  return (
    <Flex flexDir="column" flexGrow={1} pos="relative">
      <Image src="https://picsum.photos/200" borderRadius="md" />

      <Box pos="absolute" bottom={0} left={0} color="white" w="100%" p="1rem">
        <Text fontWeight="bold" size="lg" color="white">
          Lorem ipsum dolor{' '}
        </Text>
        <Text size="xs" color="grey">
          Lorem ipsum dolor
        </Text>
      </Box>
    </Flex>
  );
}

export default Banner;
