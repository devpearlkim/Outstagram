import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import useShowToast from '../useShowToast';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetFollowing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [followingUsers, setFollowingUsers] = useState([]);
  const { user } = useAuthStore();
  const showToast = useShowToast();

  useEffect(() => {
    const getFollowings = async () => {
      setIsLoading(true);
      try {
        const usersRef = collection(firestore, 'users');
        const q = query(
          usersRef,
          where('uid', 'in', user.following),
          orderBy('uid')
        );

        const querySnapshot = await getDocs(q);
        const users = [];

        querySnapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });

        setFollowingUsers(users);
      } catch (error) {
        console.error(error);
        showToast(
          'Error',
          'following목록 조회 실패, 잠시후 시도해주세요',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getFollowings();
  }, [user, showToast]);

  return { isLoading, followingUsers };
};

export default useGetFollowing;
