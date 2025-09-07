import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { USERNAME } from "../utils/constants";
import { showToast } from "../utils/toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://klickks-backend-qpwf.onrender.com/login/",
        {
          username,
          password,
        }
      );
      if (response.status === 200) {
        Cookies.set(USERNAME, username, { expires: 30 });
        showToast("Login successful!", "success");
        navigate("/", { replace: true });
      }
    } catch (e) {
      setShowErr(true);
      setErrMsg(e.response.data);
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
    <div className="h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Login to your account
        </h1>
        <form onSubmit={onLoginSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="usernameLogin" className="text-sm text-white mb-1">
              Username
            </label>
            <input
              type="text"
              id="usernameLogin"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="passwordLogin" className="text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="passwordLogin"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>
        {showErr && <p className="text-red-600 text-center">{errMsg}*</p>}
        <p className="text-center text-sm text-white mt-4">
          Don't have an account?{" "}
          <span
            className="text-yellow-300 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
