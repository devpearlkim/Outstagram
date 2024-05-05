import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import useShowToast from './useShowToast';

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const showToast = useShowToast();

  const getUserProfile = async (username) => {
    setIsLoading(true);
    setUsers([]);

    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '>=', username)
      );

      const querySnapshot = await getDocs(q);
      // if (querySnapshot.empty)
      // return showToast('Error', '해당 유저가 없습니다', 'error');

      const foundUsers = [];
      let count = 0;
      querySnapshot.forEach((doc) => {
        if (count < 5) {
          foundUsers.push(doc.data());
          count++;
        }
      });

      setUsers(foundUsers);
    } catch (error) {
      console.error(error);
      showToast('Error', '유저 조회 중 오류, 잠시 후 시도해주세요', 'error');
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getUserProfile, users, setUsers };
};

export default useSearchUser;
