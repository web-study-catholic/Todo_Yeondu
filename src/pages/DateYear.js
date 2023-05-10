import React from "react";
import Date from "../components/DateYear";
import {TodoProvider} from '../TodoContext'

const DateYear = () => {

  return (
    <>
    <TodoProvider>
      <Date/>
    </TodoProvider>
    </>
  )
}

export default DateYear;