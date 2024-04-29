import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, firestore, provider } from '../firebase/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';

export default function useSignupWithGoogle() {
  const [error, setError] = useState(null);
  const loginUser = useAuthStore((state) => state.login);

  const signupWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      let userExists = false;

      if (!user) {
        setError('구글로그인 실패, 잠시후 다시 시도해주세요');
        return;
      }

      // 유저가 이미 DB에 있는지 확인
      const docSnap = await getDocs(
        collection(firestore, 'users', 'userId', user.uid)
      );
      docSnap.forEach((doc) => {
        const userData = doc.data();
        if (userData.email === user.email) {
          userExists = true;
          localStorage.setItem('user-info', JSON.stringify(userData));
          loginUser(userData);
        }
      });

      // user가 DB에 있으면 추가로 저장하지 않음
      if (userExists) {
        return;
      }

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
      setError(err.message);
    }
  };

  return { signupWithGoogle, error };
}
