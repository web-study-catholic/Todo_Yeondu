import React from "react";
import styled from "styled-components";
import { useTodoState } from "../state/TodoContext";
import {
  BsFillBookmarkStarFill,
  BsFillCalendar2CheckFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const TodoHeadBlock = styled.div`
  padding: 48px 32px 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 10px;
    font-weight: bold;
  }
  .title {
    font-size: 21px;
    color: black;
    margin-top: 15px;
    font-weight: bold;
    display: block;
    text-align: center;
  }
  .navbar {
    display: inline-block;
  }
  .goal {
    font-size: 15px;
  }
  .icon {
    margin-left: 0.5rem;
    margin-top: 1rem;
    font-size: 20px;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const undoneTasks = todos.filter((todo) => !todo.done);

  const today = new Date();
  const dateString = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const year = today.getFullYear();

  return (
    <>
      <TodoHeadBlock>
        <h1>{dateString}</h1>
        <span className="day">{dayName}</span>
        <div className="navbar">
          <Link to="/dateyear">
            <BsFillCalendar2CheckFill className="icon" />
          </Link>
        </div>
        <div className="title">
          {year}년도에 이루고 싶은 목표
          <BsFillBookmarkStarFill className="goal" />
        </div>
        <div className="tasks-left">To do {undoneTasks.length} left</div>
      </TodoHeadBlock>
    </>
  );
}

export default TodoHead;
