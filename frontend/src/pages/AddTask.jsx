import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AddTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title) {
      alert("Title is required");
      return;
    }

    if (formData.description.length < 20) {
      alert("Description must be at least 20 characters");
      return;
    }

    try {
      await API.post("/tasks", formData);
      alert("Task Added Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add Task</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          cols="40"
        />

        <br />
        <br />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>

        <br />
        <br />

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;