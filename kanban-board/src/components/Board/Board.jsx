import React, { useState, useEffect } from "react";
import Column from "../Column/Column";

const STORAGE_KEY = "kanban-data";

const Board = ({ data }) => {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : data;
  });

  // 💾 сохраняем изменения
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const handleAddTask = (title, taskData) => {
    setColumns((prev) => {
      const newCols = prev.map((col) => ({ ...col }));

      if (title === "Backlog") {
        const backlog = newCols.find((col) => col.title === "Backlog");
        backlog.issues.push({ id: Date.now().toString(), title: taskData });
      } else {
        const currentIndex = newCols.findIndex((col) => col.title === title);
        const prevCol = newCols[currentIndex - 1];
        const currCol = newCols[currentIndex];

        const movedTask = prevCol.issues.find((i) => i.id === taskData);
        if (movedTask) {
          currCol.issues.push(movedTask);
          prevCol.issues = prevCol.issues.filter((i) => i.id !== taskData);
        }
      }
      return [...newCols];
    });
  };

  // 🔁 Сброс до исходного макета
  const handleReset = () => {
    if (window.confirm("Сбросить доску к исходному состоянию?")) {
      localStorage.removeItem(STORAGE_KEY);
      setColumns(data); // восстановим из dataMock без перезагрузки
    }
  };

  // 🔢 Счётчики
  const activeTasks =
    columns.find((col) => col.title === "In Progress")?.issues.length || 0;
  const finishedTasks =
    columns.find((col) => col.title === "Finished")?.issues.length || 0;

  return (
    <div style={styles.wrapper}>
      <div style={styles.board}>
        {columns.map((column, index) => (
          <Column
            key={column.title}
            title={column.title}
            issues={column.issues}
            previousIssues={index > 0 ? columns[index - 1].issues : []}
            onAdd={handleAddTask}
          />
        ))}
      </div>

      {/* Нижняя панель */}
      <footer style={styles.footer}>
        <div>Active tasks: {activeTasks}</div>
        <div>Finished tasks: {finishedTasks}</div>

        <div style={styles.rightBlock}>
          <button
            onClick={handleReset}
            style={styles.resetBtn}
            title="Reset board"
          >
            Reset board
          </button>
          <span style={{ marginLeft: 12 }}>
            Kanban board by <strong>Oleg &amp; Neuro Code Studio</strong> ©{" "}
            {new Date().getFullYear()}
          </span>
        </div>
      </footer>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#0077cc",
  },
  board: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "#005fa3",
    color: "white",
    padding: "15px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "16px",
    gap: 16,
    flexWrap: "wrap",
  },
  rightBlock: {
    display: "flex",
    alignItems: "center",
  },
  resetBtn: {
    backgroundColor: "#ff5252",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 14px",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
};

export default Board;
