import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete, MdEditSquare, MdCheck } from "react-icons/md";
import { useTodoDispatch } from "../state/TodoContext";

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const UpdateIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #4a90e2;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
    ${UpdateIcon} {
      display: flex;
    }
  }
`;

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
      text-decoration: line-through;
    `}
`;

const Input = styled.input`
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

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const [edit, setEdit] = useState(false);
  const [updateText, setUpdatedText] = useState(text);

  const onToggle = () => dispatch({ type: "TOGGLE", id });
  const onRemove = () => dispatch({ type: "REMOVE", id });
  const onUpdate = () => {
    if (edit) {
      dispatch({ type: "UPDATE", id, text: updateText });
      setEdit(false);
    } else {
      setEdit(true);
    }
  };

  const handleChange = (e) => {
    setUpdatedText(e.target.value);
  };

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      {edit ? (
        <div style={{ display: "flex", flex: 1 }}>
          <Input type="text" value={updateText} onChange={handleChange} />
          <UpdateIcon onClick={onUpdate}>
            <MdCheck />
          </UpdateIcon>
        </div>
      ) : (
        <div style={{ display: "flex", flex: 1 }}>
          {text && (
            <>
              <Text done={done}>{text}</Text>
              <UpdateIcon onClick={onUpdate}>
                <MdEditSquare />
              </UpdateIcon>
            </>
          )}
          {!text && (
            <UpdateIcon onClick={onUpdate}>
              <MdEditSquare />
            </UpdateIcon>
          )}
          <Remove onClick={onRemove}>
            <MdDelete />
          </Remove>
        </div>
      )}
    </TodoItemBlock>
  );
}

export default React.memo(TodoItem);
