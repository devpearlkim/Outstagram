import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useRef } from 'react';
import useSearchUser from '../../hooks/useSearchUser';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchRef = useRef(null);
  const { users, isLoading, getUserProfile } = useSearchUser();

  const handleSearchUser = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
    getUserProfile(searchRef.current.value);
  };

  return (
    <>
      <Tooltip
        hasArrow
        label={'Search'}
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
          <FiSearch size={25} />
          <Box display={{ base: 'none', md: 'block' }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
        <ModalOverlay />
        <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder='검색어 입력'
                  ref={searchRef}
                  onChange={handleSearchUser}
                />
              </FormControl>

              {/* 검색 페이지 분리 필요 */}
              <Flex w={'full'} justifyContent={'flex-end'}>
                <Button
                  type='submit'
                  ml={'auto'}
                  size={'sm'}
                  my={4}
                  isLoading={isLoading}
                >
                  Search
                </Button>
              </Flex>
            </form>
            {/* setUser 넘기지 않기 */}
            {users.length > 0 &&
              users.map((user) => <SuggestedUser user={user} key={user.uid} />)}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
