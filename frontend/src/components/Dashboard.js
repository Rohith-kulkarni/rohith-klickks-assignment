import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { LogOut, Bell, CheckCircle, Activity } from "lucide-react";
import { USERNAME } from "../utils/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const url = "https://klickks-backend-qpwf.onrender.com/";
  const [userData, setUserData] = useState(null);

  const username = Cookies.get(USERNAME);

  const onLogout = () => {
    if (Cookies.get(USERNAME)) {
      Cookies.remove(USERNAME);
      navigate("/login");
    }
  };

  useEffect(() => {
    const onHit = async () => {
      const cookie = Cookies.get(USERNAME);
      if (cookie) {
        try {
          const response = await fetch(url, { method: "GET" });
          const bod = await response.json();
          setUserData(bod);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      } else {
        navigate("/login");
      }
    };
    onHit();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          👋 Welcome back, {username || "User"}!
        </h1>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 px-6 py-2 bg-red-500 text-white font-semibold rounded-xl shadow hover:bg-red-600 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center text-white">
          <h2 className="text-lg font-semibold">📊 Active Sessions</h2>
          <p className="text-4xl font-bold mt-2">{userData?.sessions || 14}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center text-white">
          <h2 className="text-lg font-semibold">🔔 Notifications</h2>
          <p className="text-4xl font-bold mt-2">
            {userData?.notifications || 3}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center text-white">
          <h2 className="text-lg font-semibold">✅ Tasks Completed</h2>
          <p className="text-4xl font-bold mt-2">{userData?.tasks || 9}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Task Progress
        </h2>
        <div className="w-full bg-white/30 rounded-full h-4">
          <div
            className="bg-green-400 h-4 rounded-full transition-all"
            style={{ width: `${userData?.progress || 70}%` }}
          ></div>
        </div>
        <p className="text-white mt-2">
          {userData?.progress || 70}% completed 🎯
        </p>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg flex-1 mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
          <Activity size={22} /> Recent Activity
        </h2>
        <ul className="text-white space-y-5">
          <li className="flex items-center gap-3">
            <CheckCircle className="text-green-400" size={20} />
            <div>
              <p className="font-medium">Logged in successfully</p>
              <p className="text-sm text-gray-200">2 min ago</p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <Bell className="text-yellow-300" size={20} />
            <div>
              <p className="font-medium">Checked notifications</p>
              <p className="text-sm text-gray-200">10 min ago</p>
            </div>
          </li>
          <li className="flex items-center gap-3">
            <CheckCircle className="text-blue-300" size={20} />
            <div>
              <p className="font-medium">Updated profile settings</p>
              <p className="text-sm text-gray-200">30 min ago</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Motivation Widget */}
      <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center text-white">
        <h2 className="text-xl font-bold">✨ Daily Motivation ✨</h2>
        <p className="mt-3 italic">
          "Success is not final, failure is not fatal: it is the courage to
          continue that counts."
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
