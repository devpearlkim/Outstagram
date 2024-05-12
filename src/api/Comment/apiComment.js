import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export const addComment = async ({ userId, postId, comment }) => {
  const newComment = {
    comment,
    createdAt: Date.now(),
    createdBy: userId,
    postId,
  };
  console.log(userId);

  const commentRef = await addDoc(
    collection(firestore, 'comments'),
    newComment
  );
  const commentId = commentRef.id;

  await updateDoc(doc(firestore, 'posts', postId), {
    comments: arrayUnion({ ...newComment, id: commentId }),
  });
};
