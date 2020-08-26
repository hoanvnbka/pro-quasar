export async function getAllUsers (context) {
  const users = await this.$axios.get('https://jsonplaceholder.typicode.com/users')
  context.commit('user/setUsers', users)
}
