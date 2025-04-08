import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const DashMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="w-[1440px] h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-[250px] h-full bg-white flex flex-col items-center px-0 py-0 shadow-lg">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-[100px] bg-white flex items-center px-10 shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700">System Messages</h2>
        </div>

        {/* Scrollable Message List */}
        <div className="flex-1 overflow-y-auto px-10 py-6 space-y-4 bg-gray-100">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages yet.</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-gray-800"
              >
                <p>{msg.text}</p>
                <span className="block text-sm text-gray-400 mt-1">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashMessages;
