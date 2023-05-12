import React from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
import { useTodoState, useTodoDispatch } from "../state/TodoContext";
import { AiFillDelete } from "react-icons/ai";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const AllDelete = styled.button`
  display: flex;
  border: none;
  outline: none;
  color: #495057;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: 21px;
  cursor: pointer;
`;

function TodoList() {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const Remove_All = () => dispatch({ type: "REMOVE_ALL" });

  return (
    <TodoListBlock>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
        />
      ))}
      {todos.length > 0 && (
        <AllDelete onClick={Remove_All}>
          <AiFillDelete />
        </AllDelete>
      )}
    </TodoListBlock>
  );
}

export default TodoList;
