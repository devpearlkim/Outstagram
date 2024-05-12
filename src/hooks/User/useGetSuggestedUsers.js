import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import useShowToast from '../useShowToast';
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetSuggestedUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const { user } = useAuthStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(
          usersRef,
          where('uid', 'not-in', [user.uid, ...user.following]),
          orderBy('uid'),
          limit(3)
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setSuggestedUsers(users);
      } catch (error) {
        console.error(error);
        showToast('Error', '추천 유저 조회 실패, 잠시후 시도해주세요', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getSuggestedUsers();
  }, [user, showToast]);

  return { isLoading, suggestedUsers };
};

export default useGetSuggestedUsers;
