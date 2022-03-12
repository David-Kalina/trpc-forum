import BrowseThreads from 'components/BrowseThreads';
import Filter from 'components/Filter';
import Trending from 'components/Trending';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Trending />
      <Filter />
      <BrowseThreads />
    </>
  );
};

export default HomePage;
