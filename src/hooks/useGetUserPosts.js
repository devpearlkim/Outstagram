import { useEffect, useState } from 'react';
import { usePostStore } from '../store/postStore';
import useShowToast from './useShowToast';
import { useUserProfileStore } from '../store/userProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserPosts = () => {
  const showToast = useShowToast();
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts } = usePostStore();
  const { userProfile } = useUserProfileStore();

  useEffect(() => {
    const getPosts = async () => {
      if (!userProfile) return;
      setIsLoading(true);
      setPosts([]);

      try {
        const q = query(
          collection(firestore, 'posts'),
          where('createdBy', '==', userProfile.uid)
        );

        const querySnapshot = await getDocs(q);

        const posts = [];
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });

        posts.sort((a, b) => b.createdAt - a.createdAt);
        setPosts(posts);
      } catch (error) {
        console.error(error);
        showToast(
          'Error',
          '포스트 조회 중 오류 발생, 잠시 후 시도해주세요',
          'error'
        );
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    getPosts();
  }, [userProfile, setPosts, showToast]);

  return { isLoading, posts };
};

export default useGetUserPosts;
