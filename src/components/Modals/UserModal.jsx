import {
  Avatar,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import useGetSuggestedUsers from '../../hooks/User/useGetSuggestedUsers';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';

const UserModal = ({ mode = '', isOpen, onClose }) => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={{ base: 'xl', md: '3xl' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody bg={'black'} pb={5}>
          <VStack py={8} px={6} gap={4}>
            {suggestedUsers.length !== 0 && (
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                w={'full'}
              >
                <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                  {mode} userList
                </Text>
              </Flex>
            )}

            {isLoading ? (
              <Spinner />
            ) : (
              // suggestedUsers.map((user) => (
              //   <SuggestedUser user={user} key={user.uid} />
              // ))
              '구현중입니다'
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
