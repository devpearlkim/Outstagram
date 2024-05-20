import { QueryFunction } from '@tanstack/react-query'
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import { Comment } from '../APIResponsesTypes'

export const addComment = async ({ userId, postId, comment }) => {
  const newComment = {
    comment,
    createdAt: Date.now(),
    createdBy: userId,
    postId,
  }

  const commentRef = await addDoc(collection(firestore, 'comments'), newComment)
  const commentId = commentRef.id

  await updateDoc(doc(firestore, 'posts', postId), {
    comments: arrayUnion(commentId),
  })
}

export const deleteComment = async ({ postId, commentId }) => {
  await deleteDoc(doc(firestore, 'comments', commentId))

  const postRef = doc(firestore, 'posts', postId)
  await updateDoc(postRef, {
    comments: arrayRemove(commentId),
  })
}

// QueryFunction<expectedToGetBack, expectedKey>
export const fetchComments: QueryFunction<
  Comment[],
  ['comments', string]
> = async ({ queryKey }) => {
  const postId = queryKey[1]

  const q = query(
    collection(firestore, 'comments'),
    where('postId', '==', postId),
  )

  const querySnapshot = await getDocs(query(q))

  const comments: Comment[] = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() } as Comment
  })

  return comments
}
