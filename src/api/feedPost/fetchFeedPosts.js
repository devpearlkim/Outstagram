import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { PAGE_SIZE } from '../../../constant';

const fetchFeedPosts = async ({ queryKey, pageParam }) => {
  const following = queryKey[2];

  if (following.length === 0) {
    return [];
  }

  const q = query(
    collection(firestore, 'posts'),
    where('createdBy', 'in', following)
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

    const feedPosts = [];
    querySnapshot.forEach((doc) => {
      feedPosts.push({ id: doc.id, ...doc.data() });
    });

    return feedPosts;
  } catch (error) {
    console.error('게시글 로딩 중 error', error);
    throw error;
  }
};

export default fetchFeedPosts;
