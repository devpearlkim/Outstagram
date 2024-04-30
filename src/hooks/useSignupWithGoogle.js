import { signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { auth, firestore, provider } from '../firebase/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../store/authStore';

export default function useSignupWithGoogle() {
  const [error, setError] = useState(null);
  const loginUser = useAuthStore((state) => state.login);

  const signupWithGoogle = async () => {
    try {
      let userExists = false;
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      if (!user) {
        setError('구글로그인 실패, 잠시후 다시 시도해주세요');
        return;
      }

      const docRef = doc(firestore, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        userExists = true;
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()));
        loginUser(docSnap.data());
      }

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

      await setDoc(doc(firestore, 'users', user.uid), userDoc);
      localStorage.setItem('user-info', JSON.stringify(userDoc));
      loginUser(userDoc);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return { signupWithGoogle, error };
}
