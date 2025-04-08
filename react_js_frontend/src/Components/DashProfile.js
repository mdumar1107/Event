import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const DashProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState({});
  const [editName, setEditName] = useState("");
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/user", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setEditName(res.data.user.name);
      } catch (err) {
        console.error("Fetch user error:", err.response || err);
        setMessage("Failed to load user");
      }
    };
    fetchUser();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        { name: editName },
        { withCredentials: true }
      );
      setMessage(res.data.message);
      setUser({ ...user, name: editName });
    } catch (err) {
      console.error("Update profile error:", err.response || err);
      setMessage(err.response?.data?.message || "Update failed");
    }
  };
  
  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    // ✅ Frontend validation
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    ) {
      setMessage("Please fill in all password fields.");
      return;
    }
  
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setMessage("New passwords do not match.");
      return;
    }
  
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/change-password", // full backend route
        passwordData,
        { withCredentials: true } // include cookies
      );
  
      setMessage(res.data.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.error("Change password error:", err.response || err);
      setMessage(err.response?.data?.message || "Password change failed");
    }
  };
  

  return (
    <div className="w-[1440px] h-[1150px] flex bg-gray-100 p-0">
      {/* Sidebar */}
      <div className="w-[250px] h-[1150px] bg-white flex flex-col items-center px-0 py-0 shadow-lg">
        <h1 className="text-primary text-center text-[27px] font-bold mt-4 px-6 py-4">Event Hive</h1>
        <nav className="w-full px-6 mt-8">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/dash-events"
            className={({ isActive }) =>
              `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/dash-messages"
            className={({ isActive }) =>
              `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            Messages
          </NavLink>
          <NavLink
            to="/dash-profile"
            className={({ isActive }) =>
              `block px-6 py-4 font-semibold rounded-lg ${
                isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </div>

      <div className="w-[1190px] flex flex-col p-10 gap-6">
        {/* Tabs */}
        <div className="flex gap-4 mb-4">
          <button
            className={`px-6 py-2 rounded-full font-medium ${activeTab === "overview" ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium ${activeTab === "edit" ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Profile
          </button>
          <button
            className={`px-6 py-2 rounded-full font-medium ${activeTab === "password" ? "bg-primary text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {/* Feedback Message */}
        {message && (
          <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md shadow-sm">{message}</div>
        )}

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="bg-white p-8 rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}</p>
          </div>
        )}

        {/* Edit Profile */}
        {activeTab === "edit" && (
          <form onSubmit={handleUpdateProfile} className="bg-white p-8 rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">
              Save Changes
            </button>
          </form>
        )}

        {/* Change Password */}
        {activeTab === "password" && (
          <form onSubmit={handleChangePassword} className="bg-white p-8 rounded-xl shadow-md w-full">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <label className="block mb-2 font-medium">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />

            <label className="block mb-2 font-medium">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
            />

            <label className="block mb-2 font-medium">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={(e) => setPasswordData({ ...passwordData, confirmNewPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6"
            />

            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
      
  );
};

export default DashProfile;

