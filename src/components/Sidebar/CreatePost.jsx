import { Box, Flex, Tooltip, useDisclosure } from '@chakra-ui/react';
import { LuPlusSquare } from 'react-icons/lu';
import CreatePostForm from '../Modals/CreatePostForm';

const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Tooltip
        hasArrow
        label={'Create'}
        placement='right'
        ml={1}
        openDelay={500}
        display={{ base: 'block', md: 'none' }}
      >
        <Flex
          alignItems={'center'}
          gap={4}
          _hover={{ bg: 'whiteAlpha.400' }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: 'full' }}
          justifyContent={{ base: 'center', md: 'flex-start' }}
          onClick={onOpen}
        >
          <LuPlusSquare size={25} />
          <Box display={{ base: 'none', md: 'block' }}>Create</Box>
        </Flex>
      </Tooltip>
      <CreatePostForm isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CreatePost;
