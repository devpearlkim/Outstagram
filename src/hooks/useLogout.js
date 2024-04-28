import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useState } from 'react';

const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState(null);
  const logout = async () => {
    try {
      setIsLoggingOut(true);
      signOut(auth);
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
