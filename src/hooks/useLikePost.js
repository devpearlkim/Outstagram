import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useLikePost = (post) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuthStore();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user?.uid));
  const showToast = useShowToast();

  const handleLikePost = async () => {
    if (isUpdating) return;
    if (!user) return showToast('Error', '로그인 후 이용해주세요', 'error');
    setIsUpdating(true);

    try {
      const postRef = doc(firestore, 'posts', post.id);
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      setIsLiked(!isLiked);
      isLiked ? setLikes(likes - 1) : setLikes(likes + 1);
    } catch (error) {
      console.error(error);
      showToast(
        'Error',
        `${
          isLiked ? '좋아요 취소' : '좋아요 추가'
        } 중 오류 발생 잠시 후 시도해주세요`,
        'error'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return { isLiked, likes, handleLikePost, isUpdating };
};

export default useLikePost;
