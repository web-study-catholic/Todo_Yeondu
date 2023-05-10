import React , {useReducer, createContext, useContext, useRef, useEffect} from 'react'

const initialTodos = [];

function todoReducer(state, action) {
switch(action.type) {
  case 'CREATE':
    return state.concat(action.todo);
  case 'TOGGLE' :
    return state.map(todo => 
      todo.id === action.id ? {...todo, done: !todo.done} : todo
      );
  case 'REMOVE' :
    return state.filter(todo => todo.id !== action.id);
  case 'UPDATE' :
    return state.map(todo => 
      todo.id === action.id ? {...todo, text : action.text} : todo);
  default :
      throw new Error(`Unhandled action type : ${action.type}`);
}
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef();

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
    nextId.current = parsedTodos.length + 1;
    dispatch({type: 'CREATE' , todo : parsedTodos});
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state));
  },[state]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if(!context){
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}