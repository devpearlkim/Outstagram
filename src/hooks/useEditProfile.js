import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUserProfileStore } from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';

const useEditProfile = () => {
  const showToast = useShowToast();
  const [isUpdating, setIsUpdating] = useState(false);
  const { user, setUser } = useAuthStore();
  const { setUserProfile } = useUserProfileStore();

  const editProfile = async (formdata, selectedFile) => {
    if (isUpdating || !user) return;
    setIsUpdating(true);

    const storageRef = ref(storage, `profilePics/${user.uid}`);
    const userDocRef = doc(firestore, 'users', user.uid);
    let URL = '';

    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, 'data_url');
        URL = await getDownloadURL(storageRef);
      }

      const updatedUser = {
        ...user,
        username: formdata.username || user.username,
        bio: formdata.bio || user.bio,
        profilePicURL: URL || user.profilePicURL,
      };

      await updateDoc(userDocRef, updatedUser);

      localStorage.setItem('user-info', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setUserProfile(updatedUser);
      showToast(
        'Success',
        '프로필이 성공적으로 업데이트 되었습니다',
        'success'
      );
    } catch (error) {
      showToast(
        'Error',
        '프로필 업데이트 실패, 잠시 후 다시 시도해주세요',
        'error'
      );
    }
  };

  return { editProfile, isUpdating };
};

export default useEditProfile;
