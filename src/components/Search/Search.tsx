import {
  CloseButton,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';
import SearchResults from 'components/SearchResults';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { trpc } from 'utils/trpc';

function Search() {
  const [search, setSearch] = React.useState('');

  const searchQuery = trpc.useQuery([
    'post.bySearch',
    {
      search,
    },
  ]);

  return (
    <InputGroup maxW="500px" pos="relative">
      <InputLeftElement>
        <Icon as={FaSearch} />
      </InputLeftElement>
      <Input
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <InputRightAddon>
        <CloseButton onClick={() => setSearch('')} />
      </InputRightAddon>
      <SearchResults results={searchQuery.data?.posts} />
    </InputGroup>
  );
}

export default Search;
