import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      setUser(loggedInUser);
    };
  
    window.addEventListener("storage", updateUser);
    updateUser(); // Run once on mount
  
    return () => {
      window.removeEventListener("storage", updateUser);
    };
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    setDropdownOpen(false);
    setNavOpen(false);
  };

  return (
    <div className="w-full h-[49px] mx-auto flex justify-between items-center">
      <header className="w-full max-w-[1200px] h-[49px] mx-auto flex justify-between items-center p-0 bg-background mt-6 relative">
      <h1 className="text-3xl font-bold cursor-pointer"onClick={() => navigate("/")}>
        Event <span className="text-primary">Hive</span>
      </h1>
        <div className="relative flex items-center gap-4">
          {user ? (
            <>
              {/* User Avatar */}
              <button
                className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center relative"
                onClick={() => {
                  setDropdownOpen(!dropdownOpen);
                  setNavOpen(false);
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* User Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full w-48 bg-white border rounded-lg shadow-lg z-50">

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

              {/* Navbar Icon */}
              <button
                className="text-gray-700 relative"
                onClick={() => {
                  setNavOpen(!navOpen);
                  setDropdownOpen(false);
                }}
              >
                <Menu size={28} />
              </button>

              {/* Navbar Dropdown */}
              {navOpen && (
                <div className="absolute right-0 top-full w-48 bg-white border rounded-lg shadow-lg z-50">

                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      navigate("/event");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Events
                  </button>
                  <button
                    onClick={() => {
                      navigate("/trendingcollege");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Trending Colleges
                  </button>
                  <button
                    onClick={() => {
                      navigate("/college-events");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Colleges Events
                  </button>
                  <button
                    onClick={() => {
                      navigate("/all-events");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    All Events
                  </button>
                  <button
                    onClick={() => {
                      navigate("/register");
                      setNavOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </button>
                </div>
              )}
            </>
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
