import { VStack, Flex, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { FaSearch } from 'react-icons/fa';

function SearchResults({ results }: { results?: any[] }) {
  return (
    <VStack
      bg="white"
      boxShadow="lg"
      align="stretch"
      pos="absolute"
      top="50px"
      left={0}
      width="100%"
    >
      {results?.map((result) => (
        <Flex
          borderTop="1px solid gray"
          key={result.id}
          align="center"
          p="0.5rem"
        >
          <Icon as={FaSearch} />
          <Text ml="1rem">{result.title}</Text>
        </Flex>
      ))}
    </VStack>
  );
}

export default SearchResults;
