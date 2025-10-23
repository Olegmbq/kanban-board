import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const STORAGE_KEY = "kanban-data";

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const columns = JSON.parse(saved);
      const foundTask = columns
        .flatMap((col) => col.issues)
        .find((i) => i.id === id);
      if (foundTask) {
        setTask(foundTask);
        setDescription(foundTask.description || "");
      }
    }
  }, [id]);

  const handleSave = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const columns = JSON.parse(saved);
      for (let col of columns) {
        for (let issue of col.issues) {
          if (issue.id === id) {
            issue.description = description;
          }
        }
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    }
    navigate("/");
  };

  if (!task) return <p>Task not found</p>;

  return (
    <div style={styles.page}>
      <button onClick={() => navigate("/")} style={styles.back}>
        ← Back
      </button>
      <h2>{task.title}</h2>
      <textarea
        style={styles.textarea}
        placeholder="Add description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSave} style={styles.save}>
        Save
      </button>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#0077cc",
    color: "#fff",
    minHeight: "100vh",
    padding: "40px",
  },
  back: {
    background: "white",
    color: "#0077cc",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    marginBottom: "20px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    height: "200px",
    borderRadius: "6px",
    padding: "10px",
    border: "none",
    resize: "none",
    fontSize: "16px",
  },
  save: {
    marginTop: "20px",
    background: "#fff",
    color: "#0077cc",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default TaskPage;
