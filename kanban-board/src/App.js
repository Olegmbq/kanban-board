import React from "react";
import { Routes, Route } from "react-router-dom";
import { dataMock } from "./data/dataMock";
import Board from "./components/Board/Board";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Board data={dataMock} />} />
      <Route path="/tasks/:id" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
