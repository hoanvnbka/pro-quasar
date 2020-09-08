export function createPost (state, post) {
  state.posts.unshift(post)
}

export function setPosts (state, posts) {
  state.posts = posts
}

export function updatePost (state, updatedPost) {
  const post = state.posts.find(elm => elm.id === updatedPost.id)
  Object.assign(post, updatedPost)
}

export function deletePost (state, id) {
  state.posts = state.posts.filter(post => post.id !== id)
}
