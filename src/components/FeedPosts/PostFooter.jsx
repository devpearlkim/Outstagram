import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import usePostComment from '../../hooks/usePostComment';
import useLikePost from '../../hooks/useLikePost';
import { timeAgo } from '../../util/timeAgo';
import CommentsModal from '../Modals/CommentsModal';
import useShowToast from '../../hooks/useShowToast';

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState('');
  const { user } = useAuthStore();
  const commentRef = useRef(null);
  const { handleLikePost, isLiked, likes } = useLikePost(post);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const showToast = useShowToast();

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    if (!comment.trim(' ').length) {
      showToast('Error', '내용을 입력하세요', 'error');
      return;
    }
    showToast('Success', '댓글이 작성되었습니다', 'success');
    setComment('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  return (
    <Box mb={10} marginTop={'auto'}>
      <Flex alignItems={'center'} gap={4} w={'full'} pt={0} mb={2} mt={4}>
        <Box onClick={handleLikePost} cursor={'pointer'} fontSize={18}>
          {isLiked ? <IoMdHeart size={25} /> : <IoMdHeartEmpty size={25} />}
        </Box>

        <Box
          cursor={'pointer'}
          fontSize={18}
          onClick={() => commentRef.current.focus()}
        >
          <FaRegComment size={25} />
        </Box>
      </Flex>
      <Text fontWeight={600} fontSize={'sm'}>
        {likes} likes
      </Text>

      {isProfilePage && (
        <Text fontSize='12' color={'gray'}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}

      {!isProfilePage && (
        <>
          <Text fontSize='sm' fontWeight={700}>
            {creatorProfile?.username}{' '}
            <Text as='span' fontWeight={400}>
              {post.caption}
            </Text>
          </Text>
          {post.comments.length > 0 && (
            <Text
              fontSize='sm'
              color={'gray'}
              cursor={'pointer'}
              onClick={onOpen}
            >
              View all {post.comments.length} comments
            </Text>
          )}
          {isOpen ? (
            <CommentsModal isOpen={isOpen} onClose={onClose} post={post} />
          ) : null}
        </>
      )}

      {user && (
        <Flex
          alignItems={'center'}
          gap={2}
          justifyContent={'space-between'}
          w={'full'}
        >
          <InputGroup>
            <Input
              variant={'flushed'}
              placeholder={'댓글 입력'}
              fontSize={14}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              ref={commentRef}
              onKeyDown={handleKeyDown}
            />
            <InputRightElement>
              <Button
                fontSize={14}
                color={'blue.500'}
                fontWeight={600}
                cursor={'pointer'}
                _hover={{ color: 'white' }}
                bg={'transparent'}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
              >
                Post
              </Button>
            </InputRightElement>
          </InputGroup>
        </Flex>
      )}
    </Box>
  );
};

export default PostFooter;
