import { axiosInstance } from 'boot/axios'

export async function getAllUsers (context) {
  const users = await axiosInstance.get('/users')
  if (users) {
    context.commit('setUsers', users.data)
  }
}
