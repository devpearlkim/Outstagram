import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import useShowToast from '../useShowToast';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetFollowers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followUsers, setFollowUsers] = useState([]);
  const { user } = useAuthStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getFollow = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(
          usersRef,
          where('uid', 'in', user.followers),
          orderBy('uid')
        );

        const querySnapshot = await getDocs(q);
        const followers = [];

        querySnapshot.forEach((doc) => {
          followers.push({ ...doc.data(), id: doc.id });
        });

        setFollowUsers(followers);
      } catch (error) {
        console.error(error);
        showToast(
          'Error',
          'follower 목록 조회 실패, 잠시후 시도해주세요',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getFollow();
  }, [user, showToast]);

  return { isLoading, followUsers };
};

export default useGetFollowers;
