import { Avatar, Flex, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
export default function SuggestedHeader() {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
      <Flex alignItems={'center'} gap={2}>
        <Avatar name='username' size={'md'} src='/auth.png' />
        <Text fontSize={12} fontWeight={'bold'}>
          jay
        </Text>
      </Flex>
      <Link
        to={'/auth'}
        as={RouterLink}
        fontSize={14}
        fontWeight={'medium'}
        color={'blue.400'}
        cursor={'pointer'}
        style={{ textDecoration: 'none' }}
      >
        Log out
      </Link>
    </Flex>
  );
}
