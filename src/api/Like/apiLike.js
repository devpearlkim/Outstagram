import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

export const toggleLike = async ({ post, userId }) => {
  const postRef = doc(firestore, 'posts', post.id);

  await updateDoc(postRef, {
    likes: post.likes.includes(userId)
      ? arrayRemove(userId)
      : arrayUnion(userId),
  });
};
