import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import Comment from '../Comment/Comment';
import usePostComment from '../../hooks/Comment/usePostComment';
import { useEffect, useRef } from 'react';
import useShowToast from '../../hooks/useShowToast';
import { useAuthStore } from '../../store/authStore';
import useGetComments from '../../hooks/Comment/useGetComments';

const CommentsModal = ({ isOpen, onClose, post }) => {
  const showToast = useShowToast();
  const { user } = useAuthStore();
  const { createComment, isCommenting } = usePostComment(user.uid);
  const { data: comments, isLoading } = useGetComments(post.id);

  const commentRef = useRef(null);
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = (e) => {
    if (!user)
      return showToast('Error', '댓글작성은 로그인 후 가능합니다', 'error');
    e.preventDefault();

    createComment({ postId: post.id, comment: commentRef.current.value });
    commentRef.current.value = '';
  };

  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop =
        commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInLeft'>
      <ModalOverlay />
      <ModalContent bg={'black'} border={'1px solid gray'} maxW={'400px'}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={'column'}
            maxH={'250px'}
            overflowY={'auto'}
            ref={commentsContainerRef}
          >
            {comments &&
              comments.map((comment, idx) => (
                <Comment key={idx} comment={comment} />
              ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: '2rem' }}>
            <Input placeholder='Comment' size={'sm'} ref={commentRef} />
            <Flex w={'full'} justifyContent={'flex-end'}>
              <Button
                type='submit'
                ml={'auto'}
                size={'sm'}
                my={4}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
