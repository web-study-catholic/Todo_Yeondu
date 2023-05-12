import React, {
  createContext,
  useContext,
  useReducer,
  useRef,
  useEffect,
} from "react";
import todoReducer from "./todoReducer";
import { CREATE } from "./ActionTypes";

const initialTodos = [];
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(1);

  useEffect(() => {
    let storedTodos;
    try {
      storedTodos = localStorage.getItem("todos");
    } catch (e) {
      console.error("Cannot access localStorage:", e);
    }
    const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
    nextId.current = parsedTodos.length + 1;
    dispatch({ type: CREATE, todo: parsedTodos });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("todos", JSON.stringify(state));
    } catch (e) {
      console.error("Cannot save to localStorage:", e);
    }
  }, [state]);

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
  if (!context) {
    throw new Error("Cannot find TodoStateContext");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoDispatchContext");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoNextIdContext");
  }
  return context;
}
