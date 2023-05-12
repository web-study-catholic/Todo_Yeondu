import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DateYear from "./pages/DateYear";
import { TodoProvider } from "./state/TodoContext";

function App() {
  return (
    <TodoProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dateyear" element={<DateYear />} />
      </Routes>
    </TodoProvider>
  );
}

export default App;
