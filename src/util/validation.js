import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

export const isValidPassword = (password) => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passwordRegex.test(password);
};

export const checkUsernameExists = async (username) => {
  try {
    const q = query(
      collection(firestore, 'users'),
      where('username', '==', username)
    );
    const querySnapshot = await getDocs(q);
    console.log('checkUsernameExists');
    console.log('querySnapshot', querySnapshot);

    return !querySnapshot.empty;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
