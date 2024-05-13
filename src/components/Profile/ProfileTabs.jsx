import { Box, Flex, Text } from '@chakra-ui/react';
import { BsGrid3X3, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';

function ProfileTabs({ selectedTab, onTabChange }) {
  const handleTabChange = (tab) => {
    onTabChange(tab);
  };

  return (
    <Flex
      w={'full'}
      justifyContent={'center'}
      gap={{ base: 4, sm: 10 }}
      textTransform={'uppercase'}
      fontWeight={'bold'}
    >
      <Flex
        borderTop={`${selectedTab === 'default' ? '2px solid white' : ''}`}
        alignItems={'center'}
        p='3'
        gap={1}
        cursor={'pointer'}
        onClick={() => handleTabChange('default')}
      >
        <Box fontSize={20}>
          <BsGrid3X3 />
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Posts
        </Text>
      </Flex>
      <Flex
        borderTop={selectedTab === 'likes' ? '2px solid white' : ''}
        alignItems={'center'}
        p='3'
        gap={1}
        cursor={'pointer'}
        onClick={() => handleTabChange('likes')}
      >
        <Box fontSize={20}>
          {selectedTab === 'likes' ? (
            <BsSuitHeartFill fontWeight={'bold'} />
          ) : (
            <BsSuitHeart fontWeight={'bold'} />
          )}
        </Box>
        <Text fontSize={12} display={{ base: 'none', sm: 'block' }}>
          Likes
        </Text>
      </Flex>
    </Flex>
  );
}

export default ProfileTabs;
