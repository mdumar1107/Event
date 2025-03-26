import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
  };

  return (
    <div className="w-full h-[49px] mx-auto flex justify-between items-center">
      <header className="w-full max-w-[1200px] h-[49px] mx-auto flex justify-between items-center p-0 bg-background mt-6 relative">
        <h1 className="text-3xl font-bold">
          Event <span className="text-primary">Hive</span>
        </h1>
        <div className="relative">
          {user ? (
            <div className="relative">
              {/* User Avatar */}
              <button
                className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
                  <div className="p-3 text-center border-b">
                    <span className="text-lg font-semibold text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="mr-2 sm:text-[16px] sm:mr-4 font-sans text-black px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-primary sm:text-[16px] font-sans text-white px-4 sm:px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;