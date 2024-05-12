import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth, firestore } from '../../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../../store/authStore';

export default function useSignupWithEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const loginUser = useAuthStore((state) => state.login);

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

      await setDoc(doc(firestore, 'users', user.uid), userDoc);
      localStorage.setItem('user-info', JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('이미 사용 중인 이메일입니다.');
      } else {
        setError('회원가입 실패, 잠시 후 시도해주세요.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { signUpWithEmail, loading, error };
}
