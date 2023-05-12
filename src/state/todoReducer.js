import { CREATE, TOGGLE, REMOVE, UPDATE, REMOVE_ALL } from "./ActionTypes";

function todoReducer(state, action) {
  switch (action.type) {
    case CREATE:
      return state.concat(action.todo);
    case TOGGLE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case REMOVE:
      return state.filter((todo) => todo.id !== action.id);
    case UPDATE:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, text: action.text } : todo
      );
    case REMOVE_ALL:
      return [];
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
}

export default todoReducer;
