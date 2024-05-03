import { useEffect, useState } from 'react';
import useShowToast from './useShowToast';
import { useAuthStore } from '../store/authStore';
import { usePostStore } from '../store/postStore';
import { useUserProfileStore } from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetFeedPosts = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const { posts, setPosts } = usePostStore();
  const { user } = useAuthStore();
  const { setUserProfile } = useUserProfileStore();

  useEffect(() => {
    const getFeedPosts = async () => {
      setIsLoading(true);
      if (user.following.length === 0) {
        setIsLoading(false);
        setPosts([]);
        return;
      }
      const q = query(
        collection(firestore, 'posts'),
        where('createdBy', 'in', user.following)
      );
      try {
        const querySnapshot = await getDocs(q);
        const feedPosts = [];

        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() });
        });

        feedPosts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(feedPosts);
      } catch (error) {
        console.error(error);
        showToast(
          'Error',
          '게시글 로딩 중 오류 발생, 잠시 후 시도해주세요',
          'error'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (user) getFeedPosts();
  }, [user, showToast, setPosts, setUserProfile]);

  return { isLoading, posts };
};

export default useGetFeedPosts;
