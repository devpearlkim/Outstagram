import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { firestore, storage } from '../../firebase/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from 'firebase/storage';

export const createEditPost = async (userId, caption, selectedFile, id) => {
  const newPost = {
    caption,
    likes: [],
    comments: [],
    createdAt: Date.now(),
    createdBy: userId,
  };

  let postDocRef;
  if (id) {
    // Edit
    postDocRef = doc(firestore, 'posts', id);
    await updateDoc(postDocRef, {
      caption,
    });
  } else {
    // Create
    postDocRef = await addDoc(collection(firestore, 'posts'), newPost);
  }

  const userDocRef = doc(firestore, 'users', userId);
  const imageRef = ref(storage, `posts/${postDocRef.id}`);

  // 유저Ref에서 posts배열에 postDocRef.id추가
  await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });

  if (selectedFile) {
    // postDocRef에 이미지URL추가
    await uploadString(imageRef, selectedFile, 'data_url');
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(postDocRef, { imageURL: downloadURL });
  }
};

export const deletePost = async ({ postId, userId }) => {
  const imageRef = ref(storage, `posts/${postId}`);
  await deleteObject(imageRef);

  await deleteDoc(doc(firestore, 'posts', postId));

  const userRef = doc(firestore, 'users', userId);
  await updateDoc(userRef, {
    posts: arrayRemove(postId),
  });
};
