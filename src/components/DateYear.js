import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { useTodoDispatch, useTodoState } from "../state/TodoContext";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const StyledCalendar = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  .react-calendar__navigation {
    background-color: red;
  }
`;

const TodoForm = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const TodoInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TodoButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const TodoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  span {
    margin-right: 10px;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }

  button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #b02a37;
    }
  }
`;

const DateYear = () => {
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const [selectDate, setSelectDate] = useState(null);
  const [todoText, setTodoText] = useState("");

  const handleDateClick = (date) => {
    setSelectDate(date);
  };

  const filteredTodos = todos.filter(
    (todo) => selectDate && todo.date === selectDate.toISOString().slice(0, 10)
  );

  const handleTodoSubmit = (e) => {
    e.preventDefault();
    if (!selectDate || !todoText) return;

    const todo = {
      id: Date.now(),
      date: selectDate.toISOString().slice(0, 10),
      text: todoText,
      done: false,
    };
    dispatch({ type: "CREATE", todo });

    setSelectDate(null);
    setTodoText("");
  };

  return (
    <>
      <Container>
        <Title>나의 캘린더</Title>
        <StyledCalendar>
          <Calendar onClickDay={handleDateClick} className="calendar" />
        </StyledCalendar>
        {selectDate && (
          <TodoForm onSubmit={handleTodoSubmit}>
            <TodoInput
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <TodoButton type="submit">Add Todo</TodoButton>
          </TodoForm>
        )}
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id}>
            <span>{todo.date}</span>
            <span>{todo.text}</span>
            <TodoInput
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
            />
            <TodoButton
              onClick={() => dispatch({ type: "REMOVE", id: todo.id })}
            >
              Delete
            </TodoButton>
          </TodoItem>
        ))}
      </Container>
    </>
  );
};

export default DateYear;
