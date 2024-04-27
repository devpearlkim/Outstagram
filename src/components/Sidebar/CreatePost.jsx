import { Box, Link, Tooltip } from '@chakra-ui/react';
import { LuPlusSquare } from 'react-icons/lu';
import { Link as RouterLink } from 'react-router-dom';

const CreatePost = () => {
  return (
    <Tooltip
      hasArrow
      label={'Profile'}
      placement='right'
      ml={1}
      openDelay={500}
      display={{ base: 'block', md: 'none' }}
    >
      <Link
        display={'flex'}
        // to={}
        as={RouterLink}
        alignItems={'center'}
        gap={4}
        _hover={{ bg: 'whiteAlpha.400' }}
        borderRadius={6}
        p={2}
        w={{ base: 10, md: 'full' }}
        justifyContent={{ base: 'center', md: 'flex-start' }}
      >
        <LuPlusSquare size={25} />
        <Box display={{ base: 'none', md: 'block' }}>Post</Box>
      </Link>
    </Tooltip>
  );
};

export default CreatePost;
