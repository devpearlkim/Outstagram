import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export const addComment = async ({ userId, postId, comment }) => {
  const newComment = {
    comment,
    createdAt: Date.now(),
    createdBy: userId,
    postId,
  };

  const commentRef = await addDoc(
    collection(firestore, 'comments'),
    newComment
  );
  const commentId = commentRef.id;

  await updateDoc(doc(firestore, 'posts', postId), {
    comments: arrayUnion(commentId),
  });
};

export const deleteComment = async ({ postId, commentId }) => {
  await deleteDoc(doc(firestore, 'comments', commentId));

  const postRef = doc(firestore, 'posts', postId);
  await updateDoc(postRef, {
    comments: arrayRemove(commentId),
  });
};

export const fetchComments = async ({ queryKey }) => {
  const postId = queryKey[1];
  // if (!postId) {
  //   return [];
  // }

  const q = query(
    collection(firestore, 'comments'),
    where('postId', '==', postId)
  );

  const querySnapshot = await getDocs(query(q));

  const comments = [];
  querySnapshot.forEach((doc) => {
    comments.push({ id: doc.id, ...doc.data() });
  });

  return comments;
};
