import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { PAGE_SIZE } from '../../../constant';

export const toggleLike = async ({ post, user }) => {
  const postRef = doc(firestore, 'posts', post.id);

  await updateDoc(postRef, {
    likes: post.likes.includes(user.uid)
      ? arrayRemove(user.uid)
      : arrayUnion(user.uid),
  });
};

export const fetchLikedPosts = async ({ queryKey, pageParam }) => {
  const userId = queryKey[2];

  const q = query(
    collection(firestore, 'posts'),
    where('likes', 'array-contains', userId)
  );

  try {
    let querySnapshot;

    if (pageParam == 0) {
      querySnapshot = await getDocs(
        query(q, orderBy('createdAt'), limit(PAGE_SIZE))
      );
    } else {
      querySnapshot = await getDocs(
        query(q, orderBy('createdAt'), startAfter(pageParam), limit(PAGE_SIZE))
      );
    }

    const likedPosts = [];
    querySnapshot.forEach((doc) => {
      likedPosts.push({ id: doc.id, ...doc.data() });
    });

    return likedPosts;
  } catch (error) {
    console.error('좋아요한 게시글 로딩 중 error', error);
    throw error;
  }
};
