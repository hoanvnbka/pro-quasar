import { axiosInstance } from 'boot/axios'

export async function createTodo (context, todo) {
  const response = await axiosInstance.post('/todos', todo)
  if (response) {
    context.commit('insertTodo', response.data)
  }
}

export async function getAllTodos (context) {
  const todos = await axiosInstance.get('/todos')
  if (todos) {
    context.commit('setTodos', todos.data)
  }
}

export async function editTodo (context, updatedTodo) {
  await axiosInstance.put(`/todos/${updatedTodo.id}`, updatedTodo)
  context.commit('updateTodo', updatedTodo)
}

export async function removeTodo (context, id) {
  await axiosInstance.delete(`/todos/${id}`)
  context.commit('deleteTodo', id)
}
