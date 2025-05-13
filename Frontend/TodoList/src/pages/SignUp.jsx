import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Config from "../Config";
const Signup = () => {
  const [formData, setFormData] = useState({ userName: "",email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (  !formData.userName || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      console.log("first")
      const response = await axios.post(
          `${Config.api_endpoint}/signup`,
        formData,
        { withCredentials: true } // in case token is set in cookie
      );
      console.log("second")

      if (response.data.success) {
        navigate("/login");
      }
      console.log("third")
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      console.log(err.message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="userName"
          placeholder="Name"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
