import {
  Avatar,
  Box,
  Button,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
} from '@chakra-ui/react';
import useGetUserProfileById from '../../hooks/User/useGetUserProfileById';
import { Link } from 'react-router-dom';
import { timeAgo } from '../../util/timeAgo';
import { MdDelete } from 'react-icons/md';
import useDeleteComment from '../../hooks/Comment/useDeleteComment';

const Comment = ({ comment }) => {
  const { userProfile, isLoading } = useGetUserProfileById(comment.createdBy);
  const { deleteComment, isDeleting } = useDeleteComment();
  const handleDeleteComment = () => {
    deleteComment({ commentId: comment.id, postId: comment.postId });
  };

  if (isLoading) return <CommentSkeleton />;
  return (
    <Flex justifyContent={'space-between'} w={'full'}>
      <Flex gap={4} justifyContent={'space-between'}>
        <Link to={`/${userProfile.username}`}>
          <Avatar src={userProfile.profilePicURL || '/none.jpg'} size={'sm'} />
        </Link>
        <Flex direction={'column'}>
          <Flex gap={2} alignItems={'center'}>
            <Link to={`/${userProfile.username}`}>
              <Text fontWeight={'bold'} fontSize={12}>
                {userProfile.username}
              </Text>
            </Link>
            <Text fontSize={14}>{comment.comment}</Text>
          </Flex>
          <Text fontSize={12} color={'gray'}>
            {timeAgo(comment.createdAt)}
          </Text>
        </Flex>
      </Flex>
      <Button
        size={'xs'}
        bg={'transparent'}
        _hover={{ bg: 'whiteAlpha.300', color: 'red.600' }}
        borderRadius={4}
        onClick={handleDeleteComment}
        isLoading={isDeleting}
      >
        <MdDelete size={18} cursor='pointer' />
      </Button>
    </Flex>
  );
};

export default Comment;

const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={'full'} alignItems={'center'}>
      <SkeletonCircle h={10} w='10' />
      <Flex gap={1} flexDir={'column'}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};
