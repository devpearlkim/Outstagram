import { useEffect, useState } from 'react';
import useShowToast from '../useShowToast';
import { firestore } from '../../firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useUserProfileStore } from '../../store/userProfileStore';

function useGetUserProfileByUsername(username) {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(firestore, 'users'),
          where('username', '==', username)
        );
        const querySnapShot = await getDocs(q);

        if (querySnapShot.empty) return setUserProfile(null);

        let userDoc;
        querySnapShot.forEach((doc) => {
          userDoc = doc.data();
        });

        setUserProfile(userDoc);
      } catch (error) {
        showToast('Error', error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, showToast, username]);

  return { isLoading, userProfile };
}

export default useGetUserProfileByUsername;
