import { useState } from 'react';
import useShowToast from './useShowToast';
import { useAuthStore } from '../store/authStore';
import { usePostStore } from '../store/postStore';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const usePostComment = () => {
  const [isCommenting, setIsCommenting] = useState(false);
  const showToast = useShowToast();
  const { user } = useAuthStore();
  const { addComment } = usePostStore();

  const handlePostComment = async (postId, comment) => {
    if (isCommenting) return;
    if (!user)
      return showToast('Error', '댓글작성은 로그인 후 가능합니다', 'error');
    setIsCommenting(true);

    const newComment = {
      comment,
      createdAt: Date.now(),
      createdBy: user.uid,
      postId,
    };

    try {
      const commentRef = await addDoc(
        collection(firestore, 'comments'),
        newComment
      );
      const commentId = commentRef.id;

      await updateDoc(doc(firestore, 'posts', postId), {
        comments: arrayUnion({ ...newComment, id: commentId }),
      });

      addComment(postId, newComment);
    } catch (error) {
      showToast('Error', error.message, 'error');
    } finally {
      setIsCommenting(false);
    }
  };

  return { isCommenting, handlePostComment };
};

export default usePostComment;
