import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';

const useLogout = () => {
  const userLogout = useAuthStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      signOut(auth);
      userLogout();
    } catch (err) {
      console.error(err);
      setError('로그아웃 과정에서 에러 발생');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return { logout, isLoggingOut, error };
};

export default useLogout;
