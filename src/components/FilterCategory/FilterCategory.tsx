import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

function FilterCategory() {
  return (
    <Menu>
      <MenuButton flex={1} as={Button} rightIcon={<FaChevronDown />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem>Most Controversial</MenuItem>
        <MenuItem>New</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default FilterCategory;
