import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUser(null);

    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '==', username)
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty)
        return showToast('Error', '해당 유저가 없습니다', 'error');

      // 유저 하나
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      console.error(error);
      showToast('Error', '유저 조회 중 오류, 잠시 후 시도해주세요', 'error');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, user, setUser };
};

export default useSearchUser;
