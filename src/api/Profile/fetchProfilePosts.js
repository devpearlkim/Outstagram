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

const fetchProfilePosts = async ({ queryKey, pageParam }) => {
  const userProfileId = queryKey[2];

  const q = query(
    collection(firestore, 'posts'),
    where('createdBy', '==', userProfileId)
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

    const profilePosts = [];
    querySnapshot.forEach((doc) => {
      profilePosts.push({ id: doc.id, ...doc.data() });
    });

    return profilePosts;
  } catch (error) {
    console.error('게시글 로딩 중 error', error);
    throw error;
  }
};

export default fetchProfilePosts;
