import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useUserProfileStore } from '../store/userProfileStore';
import useShowToast from './useShowToast';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

// 팔로잉/언팔로잉 할 유저아이디 매개변수로 받음
function useFollowUser(userId) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, setUser } = useAuthStore();
  const { userProfile, setUserProfile } = useUserProfileStore();
  const showToast = useShowToast();

  const handleFollowUser = async () => {
    setIsUpdating(true);

    try {
      // 현재유저, 팔로잉/언팔로잉 할 유저 모두 업데이트
      const currentUserRef = doc(firestore, 'users', user.uid);
      const userToFollowOrUnfollorRef = doc(firestore, 'users', userId);

      console.log(isFollowing);
      await updateDoc(currentUserRef, {
        following: isFollowing ? arrayRemove(userId) : arrayUnion(userId),
      });

      console.log(isFollowing);
      await updateDoc(userToFollowOrUnfollorRef, {
        followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid),
      });

      if (isFollowing) {
        // 언팔로잉
        setUser({
          ...user,
          following: user.following.filter((uid) => uid !== userId),
        });

        // 유저 프로필 페이지에서 언팔로잉 한 경우
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: userProfile.followers.filter((uid) => uid !== user.uid),
          });

        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...user,
            following: user.following.filter((uid) => uid !== userId),
          })
        );

        setIsFollowing(false);
      } else {
        // 팔로잉
        setUser({
          ...user,
          following: [...user.following, userId],
        });

        // 유저 프로필 페이지에서 팔로잉 한 경우
        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, user.uid],
          });

        localStorage.setItem(
          'user-info',
          JSON.stringify({
            ...user,
            following: [...user.following, userId],
          })
        );
        setIsFollowing(true);
      }
    } catch (error) {
      console.error(error);
      showToast(
        'Error',
        `${isFollowing ? 'unfollow' : 'follow'} 실패, 잠시후 시도해주세요`,
        'error'
      );
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (user) {
      const isFollowing = user.following.includes(userId);
      setIsFollowing(isFollowing);
    }
  }, [user, userId]);

  return { isUpdating, isFollowing, handleFollowUser };
}

export default useFollowUser;
