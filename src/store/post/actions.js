import { axiosInstance } from 'boot/axios'

export async function createPost (context, newPost) {
  await axiosInstance.post('/posts', newPost)
}

export async function getAllPosts (context) {
  const posts = await axiosInstance.get('/posts')
  if (posts) {
    context.commit('setPosts', posts.data)
  }
}

export async function removePost (context, id) {
  await axiosInstance.delete(`/posts/${id}`)
}
