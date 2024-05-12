import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';

const useGetUserProfileById = (userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      setIsLoading(true);
      setUserProfile(null);

      try {
        const userRef = await getDoc(doc(firestore, 'users', userId));
        if (userRef.exists()) {
          setUserProfile(userRef.data());
        }
      } catch {
        console.error;
      } finally {
        setIsLoading(false);
      }
    };

    getUserProfile();
  }, [setUserProfile, userId]);

  return { isLoading, userProfile, setUserProfile };
};

export default useGetUserProfileById;
