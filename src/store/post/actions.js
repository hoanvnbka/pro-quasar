import { axiosInstance } from 'boot/axios'

export async function createPost (context, newPost) {
  const response = await axiosInstance.post('/posts', newPost)
  if (response) {
    context.commit('createPost', response.data)
  }
}

export async function getAllPosts (context) {
  const posts = await axiosInstance.get('/posts')
  if (posts) {
    context.commit('selectPosts', posts.data)
  }
}

export async function editPost (context, updatedPost) {
  await axiosInstance.put(`/posts/${updatedPost.id}`, updatedPost)
  context.commit('updatePost', updatedPost)
}

export async function removePost (context, id) {
  await axiosInstance.delete(`/posts/${id}`)
  context.commit('deletePost', id)
}
