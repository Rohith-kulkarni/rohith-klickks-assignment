import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { USERNAME } from "../utils/constants";
import { showToast } from "../utils/toast";

const Register = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("https://klickks-backend-qpwf.onrender.com/register/", {
        username,
        password,
      });
      showToast("Registered successfully!", "success");
    } catch (e) {
      showToast(e.response?.data || "Registration failed!", "error");
      console.log(e);
    }
  };

  useEffect(
    () => {
      const cookie = Cookies.get(USERNAME);
      if (cookie) {
        navigate("/", { replace: true });
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-tr from-green-500 via-teal-500 to-cyan-500">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-96">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Register an account
        </h1>
        <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm text-white mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              onChange={(e) => setUserName(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-white mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow hover:bg-cyan-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-white mt-4">
          Already have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
