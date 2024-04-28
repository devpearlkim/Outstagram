import { signInWithEmailAndPassword } from 'firebase/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../firebase/firebase';
import { useState } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';

function useLogin() {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(false);
  const loginUser = useAuthStore((state) => state.login);

  const signIn = async ({ email, password }) => {
    if (!email || !password) {
      showToast('Error', '모든 항목을 입력해주세요', 'error');
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const docSnap = await getDocs(
          collection(firestore, 'users', 'userId', userCredential.user.uid)
        );
        docSnap.forEach((doc) => {
          const userData = doc.data();
          localStorage.setItem('user-info', JSON.stringify(userData));
          loginUser(userData);
        });
      }
    } catch (err) {
      console.error(err);
      showToast('Error', '로그인 실패, 잠시 후 시도해주세요.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return { signIn, loading };
}

export default useLogin;
