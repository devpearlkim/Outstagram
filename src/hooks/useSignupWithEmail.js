import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, firestore } from '../firebase/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useShowToast from './useShowToast';

export default function useSignupWithEmail() {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const signUpWithEmail = async ({ email, password, username }) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userDoc = {
        uid: user.uid,
        email: user.email,
        username: username,
        bio: '',
        profilePicURL: '',
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now(),
      };
      await addDoc(collection(firestore, 'users', user.uid), userDoc);
      localStorage.setItem('user-info', JSON.stringify(userDoc));
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
        throw error;
      } else {
        setError('회원가입 실패, 잠시 후 시도해주세요');
      }
    } finally {
      setLoading(false);
    }
  };
  return { signUpWithEmail, loading, error };
}
