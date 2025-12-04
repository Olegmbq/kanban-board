import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./Column.css";

const Column = ({ title, issues, previousIssues, onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const handleAddClick = () => {
    if (title === "Backlog") {
      if (isAdding && newTask.trim() !== "") {
        onAdd(title, newTask);
        setNewTask("");
      }
      setIsAdding(!isAdding);
      return;
    }

    if (isAdding && selectedTask) {
      onAdd(title, selectedTask);
      setSelectedTask("");
    }
    setIsAdding(!isAdding);
  };

  return (
    <div style={styles.column}>
      <h2 style={styles.title}>{title}</h2>

      {/* Список задач */}
      <TransitionGroup>
        {issues.map((issue) => (
          <CardAnimated key={issue.id} issue={issue} />
        ))}
      </TransitionGroup>

      {/* Поле для новой задачи (Backlog) */}
      {isAdding && title === "Backlog" && (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task title..."
          style={styles.input}
        />
      )}

      {/* Dropdown для остальных колонок */}
      {isAdding && title !== "Backlog" && (
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          style={styles.input}
        >
          <option value="">Select task...</option>
          {previousIssues.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      )}

      {/* Кнопка Add/Submit */}
      <button
        onClick={handleAddClick}
        style={{
          ...styles.button,
          backgroundColor:
            title !== "Backlog" && previousIssues.length === 0
              ? "#999"
              : "#0077cc",
          cursor:
            title !== "Backlog" && previousIssues.length === 0
              ? "not-allowed"
              : "pointer",
        }}
        disabled={title !== "Backlog" && previousIssues.length === 0}
      >
        {isAdding ? "Submit" : "+ Add card"}
      </button>
    </div>
  );
};

/* ✨ Отдельный компонент для анимированной карточки */
const CardAnimated = ({ issue }) => {
  const nodeRef = useRef(null);

  return (
    <CSSTransition nodeRef={nodeRef} timeout={300} classNames="card">
      <Link to={`/tasks/${issue.id}`} style={styles.cardLink}>
        <div ref={nodeRef} style={styles.card}>
          {issue.title}
        </div>
      </Link>
    </CSSTransition>
  );
};

const styles = {
  column: {
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "8px",
    width: "22%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    backgroundColor: "#f2f2f2",
    borderRadius: "6px",
    padding: "8px",
    marginBottom: "8px",
  },
  input: {
    padding: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px",
    marginTop: "auto",
  },
};

export default Column;
