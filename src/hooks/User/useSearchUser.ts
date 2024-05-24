import { useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../../firebase/firebase'
import useShowToast from '../useShowToast'
import { User } from '../../api/APIResponsesTypes'

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const showToast = useShowToast()
  const getUserProfile = async (username: string) => {
    setIsLoading(true)
    setUsers([])

    try {
      const q = query(
        collection(firestore, 'users'),
        where('username', '>=', username),
      )

      const querySnapshot = await getDocs(q)

      const foundUsers: User[] = []
      let count = 0
      querySnapshot.forEach((doc) => {
        if (count < 5) {
          const userdata = doc.data() as User
          foundUsers.push(userdata)
          count++
        }
      })

      setUsers(foundUsers)
    } catch (error) {
      console.error(error)
      showToast('Error', '유저 조회 중 오류, 잠시 후 시도해주세요', 'error')
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, getUserProfile, users, setUsers }
}

export default useSearchUser
