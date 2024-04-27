import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SidebarItems from './SidebarItems';
import { IoLogoInstagram } from 'react-icons/io';

export default function Sidebar() {
  return (
    <Box
      height={'100vh'}
      borderRight={'1px solid'}
      borderColor={'whiteAlpha.300'}
      py={8}
      position={'sticky'}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={'column'} gap={10} w={'full'} height={'full'}>
        <Link
          to={'/'}
          as={RouterLink}
          pl={2}
          display={{ base: 'none', md: 'block' }}
          cursor={'pointer'}
        >
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Outstagram
          </Text>
        </Link>
        <Link
          to={'/'}
          as={RouterLink}
          p={2}
          display={{ base: 'block', md: 'none' }}
          borderRadius={6}
          _hover={{
            bg: 'whiteAlpha.200',
          }}
          w={10}
          cursor='pointer'
        >
          <IoLogoInstagram size={25} />
        </Link>
        <Flex direction={'column'} gap={5} cursor={'pointer'}>
          <SidebarItems />
        </Flex>
      </Flex>
    </Box>
  );
}
