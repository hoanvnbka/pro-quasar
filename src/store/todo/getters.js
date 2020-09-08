export function completedTodos (state) {
  return state.todos.filter(elm => elm.completed === true)
}

export function doingTodos (state) {
  return state.todos.filter(elm => elm.completed === false)
}
