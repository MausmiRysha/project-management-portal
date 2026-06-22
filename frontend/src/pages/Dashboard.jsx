import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const completeTask = async (id) => {
    try {
      await API.put(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks =
    filter === "All"
      ? tasks
      : tasks.filter((task) => task.status === filter);

  if (loading) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Dashboard</h1>

      <Link to="/add-task">
        <button
          style={{
            padding: "10px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
        >
          Add Task
        </button>
      </Link>

      <br />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "20px",
        }}
      >
        <option value="All">All Tasks</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      {filteredTasks.length === 0 ? (
        <h2>No Tasks Found</h2>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {new Date(task.createdAt).toLocaleDateString()}
            </p>

            {task.status !== "Completed" && (
              <button
                onClick={() => completeTask(task._id)}
                style={{
                  padding: "8px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
              >
                Complete Task
              </button>
            )}

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              Delete Task
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;