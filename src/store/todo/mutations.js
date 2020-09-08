export function insertTodo (state, todo) {
  state.todos.push(todo)
}

export function setTodos (state, todos) {
  state.todos = todos
}

export function updateTodo (state, updatedTodo) {
  const todo = state.todos.find(elm => elm.id === updatedTodo.id)
  if (todo) {
    Object.assign(todo, updatedTodo)
  }
}

export function deleteTodo (state, id) {
  state.todos = state.todos.filter(elm => elm.id !== id)
}
