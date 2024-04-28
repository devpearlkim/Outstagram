import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import SuggestedUser from './SuggestedUser';
import SuggestedHeader from './SuggestedHeader';

export default function SuggestedUsers() {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex justifyContent={'space-between'} alignItems={'center'} w={'full'}>
        <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
          Suggested for you
        </Text>
        <Text
          fontSize={12}
          fontWeight={'bold'}
          _hover={{ color: 'gray.400' }}
          cursor={'pointer'}
        >
          See All
        </Text>
      </Flex>
      <SuggestedUser name='kim' followers={1234} avatar='/auth.png' />
      <SuggestedUser name='kim' followers={1234} avatar='/auth.png' />
      <SuggestedUser name='kim' followers={1234} avatar='/auth.png' />

      <Box fontSize={12} color={'gray.500'} mt={5} alignSelf={'start'}>
        © 2024 Built By{' '}
        <Link
          href='https://github.com/devpearlkim/Outstagram'
          target='_blank'
          color='blue.500'
          fontSize={14}
        >
          devpearlkim
        </Link>
      </Box>
    </VStack>
  );
}
