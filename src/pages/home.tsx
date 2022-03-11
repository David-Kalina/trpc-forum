import { VStack } from '@chakra-ui/react';
import BrowseThreads from 'components/BrowseThreads';
import Filter from 'components/Filter';
import Navigation from 'components/Navigation';
import Trending from 'components/Trending';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Navigation />
      <VStack p="4em" align="stretch" w="80%" mx="auto" spacing={12} mt="100px">
        <Trending />
        <Filter />
        <BrowseThreads />
      </VStack>
    </>
  );
};

export default HomePage;
