import { signInWithEmailAndPassword } from 'firebase/auth';
import useShowToast from './useShowToast';
import { auth, firestore } from '../firebase/firebase';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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
        const docRef = doc(firestore, 'users', userCredential.user.uid);
        const docSnap = await getDoc(docRef);
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
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
