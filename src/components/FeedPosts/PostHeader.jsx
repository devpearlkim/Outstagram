import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

export default function PostHeader({ username, avatar }) {
  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      w={'full'}
      my={2}
    >
      <Flex alignItems={'center'} gap={2}>
        <Avatar src={avatar} alt='user profile img' size={'sm'} />
        <Flex fontSize={12} fontWeight={'bold'} gap={2}>
          {username}
          <Box color={'gray.500'}> 1min </Box>
        </Flex>
      </Flex>
      <Box cursor={'pointer'}>
        <Text
          fontSize={12}
          fontWeight={'bold'}
          color={'blue.500'}
          _hover={{ color: 'white' }}
          transition={'0.2 ease-in-out'}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
}
