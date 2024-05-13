import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';

const FollowingModal = ({ users, isOpen, onClose }) => {
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
            {users?.length !== 0 && (
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                w={'full'}
              >
                <Text fontSize={12} fontWeight={'bold'} color={'gray.500'}>
                  following user List
                </Text>
              </Flex>
            )}
            {users?.map((user) => (
              <SuggestedUser user={user} key={user.uid} />
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FollowingModal;
