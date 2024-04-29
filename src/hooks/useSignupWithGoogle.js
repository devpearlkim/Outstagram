import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, firestore, provider } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';
import useShowToast from './useShowToast';

export default function useSignupWithGoogle() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loginUser = useAuthStore((state) => state.login);
  const showToast = useShowToast();

  const signupWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, provider);
      const { user } = result;

      console.log(user);
      const userDoc = {
        uid: user.uid,
        email: user.email,
        username: user.displayName,
        bio: '',
        profilePicURL: user.photoURL,
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
      await addDoc(collection(firestore, 'users', 'userId', user.uid), userDoc);
      localStorage.setItem('user-info', JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return { signupWithGoogle, loading, error };
}
