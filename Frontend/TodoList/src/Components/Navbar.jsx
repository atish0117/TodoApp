import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // Logout handler
  const handleLogout = async () => {
    try {
      // 1) Call your logout endpoint to clear server-side cookie (if using cookies)
      await axios.get("http://localhost:5000/api/v1/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.warn("Server logout failed, clearing locally anyway");
    }

    // 2) Clear localStorage token
    localStorage.removeItem("token");

    // 3) Update state & redirect
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">MyTodoApp</Link>
      </div>

      <div className="space-x-4">
        <Link to="/todos" className="hover:underline">
          Todos
        </Link>

        {!isAuthenticated ? (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
            >
              Login
            </Link>
            <Link
              to="/singup"
              className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
