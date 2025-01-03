import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../auth/authSlice";
import CustomButton from "../reuseables/CustomButton";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const trimmedUsername = data.username.trim();
    const trimmedPassword = data.password.trim();

    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (trimmedUsername === storedUsername && trimmedPassword === storedPassword) {
      dispatch(login({ username: trimmedUsername, password: trimmedPassword }));
      localStorage.setItem("username", trimmedUsername);
      localStorage.setItem("password", trimmedPassword);
      setError("");
      navigate("/home");
    }
    else{
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-auto max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base text-sm"
            value={data.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base text-sm"
            value={data.password}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton
          style="w-full bg-black text-white py-2 rounded hover:bg-blue-600"
          type="submit"
          textContent="Login"
        />
      </form>
      <div className="flex flex-wrap justify-between items-center w-full max-w-sm text-sm space-y-2 sm:space-y-0 sm:space-x-2">
        <span>New User?</span>
        <Link to="/signup" className="text-blue-500 hover:underline">
          Register Here
        </Link>
      </div>
    </div>
  );
};

export default Login;
