import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const Home = () => {
  const [formData, setFormData] = useState({ textdata: "" });
  const [task, setTask] = useState([]);
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch All Tasks
  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTask(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchAllTask();
  }, []);

  // 🔹 Handle Input Change
  const handleInputChange = (e) => {
    setFormData({ textdata: e.target.value });
  };

  // 🔹 Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!formData.textdata.trim()) return;

    try {
      const response = await axios.post(`${API_URL}/addTodo`, formData);
      setTask([...task, response.data.data]); // Update UI instantly
      setFormData({ textdata: "" }); // Clear input field
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  // 🔹 Update Task
  const handleUpdateTask = async (id) => {
    if (!formData.textdata.trim()) return;
    try {
      const response = await axios.put(`${API_URL}/updateTodo/`, {
        id,
        textdata: formData.textdata,
      });

      // Replace the existing task in the state
      setTask(task.map((t) => (t._id === id ? response.data.data : t)));

      setEditId(null); // Exit edit mode
      setFormData({ textdata: "" }); // Clear input field
    } catch (error) {
      console.error("Error updating task:", error.message);
    }
  };

  // 🔹 Delete Task
  const handleDeleteTask = async (id) => {
    try {
        console.log("Deleting Task with ID:", id);
        
        await axios.request({
            method: "delete",
            url: `${API_URL}/deleteTodo`, //  No ID in URL
            data: { id }, //  Send ID in request body
        });

        // Update UI instantly by filtering out the deleted task
        setTask(task.filter((t) => t._id !== id));
    } catch (error) {
        console.error("Error deleting task:", error.response ? error.response.data : error.message);
    }
};

  return (
    <div className="min-h-screen bg-yellow-500 flex items-center justify-center p-4">
      <div className="bg-red-500 mx-auto w-2/3 p-6 rounded-md shadow-md">
        {/* 🔹 Input Section */}
        <div className="flex justify-center w-full bg-blue-200 my-3 gap-4 p-4 rounded-md">
          <input
            type="text"
            value={formData.textdata}
            onChange={handleInputChange}
            className="w-2/3 p-2 border rounded outline-none"
            placeholder="Enter task..."
          />
          {editId ? (
            <button
              onClick={() => handleUpdateTask(editId)}
              className="bg-yellow-500 text-white rounded-lg px-4 py-2 hover:bg-yellow-600 transition"
            >
              Save Task
            </button>
          ) : (
            <button
              onClick={handleAddTask}
              className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition"
            >
              Add Task
            </button>
          )}
        </div>

        {/* 🔹 Task List */}
        <div className="bg-yellow-200 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Your Tasks:</h2>
          {task.length > 0 ? (
            <ul className="space-y-2">
              {task.map((Task) => (
                <li
                  key={Task._id}
                  className="bg-white p-2 rounded shadow-md flex justify-between items-center"
                >
                  {editId === Task._id ? (
                    <input
                      type="text"
                      value={formData.textdata}
                      onChange={handleInputChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <span>{Task.textdata}</span>
                  )}

                  <div className="flex gap-2">
                    {editId === Task._id ? (
                      <button
                        onClick={() => handleUpdateTask(Task._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditId(Task._id);
                          setFormData({ textdata: Task.textdata });
                        }}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Update
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteTask(Task._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-sm">No tasks added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
