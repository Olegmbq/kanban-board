import React, { useState } from "react";
import { Link } from "react-router-dom";
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
      <div style={styles.cardsList}>
        {issues.map((issue) => (
          <Link
            key={issue.id}
            to={`/tasks/${issue.id}`}
            style={styles.cardLink}
          >
            <div style={styles.card}>{issue.title}</div>
          </Link>
        ))}
      </div>

      {/* Поле для новой задачи */}
      {isAdding && title === "Backlog" && (
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task title..."
          style={styles.input}
        />
      )}

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

const styles = {
  column: {
    backgroundColor: "#e9eef7",
    padding: "15px",
    borderRadius: "10px",
    width: "22%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
  },
  cardHover: {
    transform: "scale(1.02)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },

  title: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  cardsList: {
    flexGrow: 1,
  },
  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "12px 10px",
    marginBottom: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
    color: "#222",
    fontWeight: "500",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
