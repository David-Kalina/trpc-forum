import { Flex, HStack } from '@chakra-ui/react';
import CreateThread from 'components/CreateThread';
import FilterCategory from 'components/FilterCategory';
import React from 'react';

function Filter() {
  return (
    <Flex>
      <HStack flex={3}>
        <FilterCategory />
        <FilterCategory />
        <FilterCategory />
      </HStack>

      <CreateThread />
    </Flex>
  );
}

export default Filter;
