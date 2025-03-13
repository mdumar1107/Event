import React from "react";
import { NavLink } from "react-router-dom";

const DashEvents = () => {
  return (
    <div className="w-[1440px] h-[1580px] flex bg-gray-100 p-0">
     {/* Sidebar */}
     <div className="w-[250px] h-[1580px] bg-white flex flex-col items-center px-0 py-0 shadow-lg">
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
      <div className="w-[1190px] flex flex-col px-0 py-0">
        {/* Top Blank Card */}
        <div className="w-[1190px] h-[100px] bg-white"></div>

        {/* Main Card */}
        <div className="flex flex-col items-center bg-background py-[20px]">
        <div className="w-[1130px] h-[1328px] bg-background  mt-4 p-0">
          {/* Top Section with Background Image */}
          <div className="w-full h-[350px] bg-cover bg-center relative flex justify-between items-center text-white px-12 rounded-lg" 
              style={{ backgroundImage: "url('/dbeimg1.jpg')" }}>
            
            {/* Left Side - Text */}
            <div className="w-1/2 text-left">
              <h1 className="text-[34px] font-bold leading-tight">Discover and <br /> experience <br />extraordinary Events</h1>
              <p className="mt-2 text-[16px] font-sans">Enter in the world of events. Discover now the latest Events or start creating your own!</p>
              <div className="mt-12 flex gap-4">
                <button className="bg-white text-black px-6 py-2 rounded-[50px] font-semibold">Discover now</button>
                <button className=" px-6 py-2 rounded-lg font-semibold">Watch video</button>
              </div>
            </div>
          </div>

          {/* Events Participated Section */}
          <h2 className="text-purple-600 text-[30px] font-bold px-6 mt-8 font-sans">Events <span className="text-black">Participated</span></h2>
          <div className="w-full h-[370px] flex gap-[40px] px-0 py-0 mt-8 bg-background">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="bg-white h-full w-full p-4  rounded-[20px]">
                {/* Event Image with Heart Icon */}
                <div className="relative">
                  <img src="/dbeimg2.jpg" alt="Event" className="w-full h-[200px] rounded-[18px]" />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    ❤️
                  </button>
                </div>

                {/* Event Details and Profile Images in the same row */}
                <div className="flex justify-between items-center mt-4 px-3 font-sans">
                  <div>
                    <h3 className="text-[18px] font-bold">Abstract Colors</h3>
                    <p className="text-gray-600 text-[14px]">By Esthera Jackson</p>
                  </div>
                  {/* Participants & Age Restriction - Right Aligned */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      <img src="/dbeimg3.jpg" alt="User 1" className="w-6 h-6 rounded-full border-2 border-white" />
                      <img src="/dbeimg4.jpg" alt="User 2" className="w-6 h-6 rounded-full border-2 border-white" />
                      <img src="/dbeimg5.jpg" alt="User 3" className="w-6 h-6 rounded-full border-2 border-white" />
                      <img src="/dbeimg6.jpg" alt="User 3" className="w-6 h-6 rounded-full border-2 border-white" />
                    </div>
                  </div>
                </div>

                {/* Footer: Current Data (Left) & Register Button (Right) */}
                <div className="flex justify-between items-center px-3 mt-4">
                  <span className="text-navy font-semibold cursor-pointer">Current Data</span>
                  <button className="bg-navy text-white px-6 py-1.5 rounded-[50px]">Register</button>
                </div>
              </div>
            ))}
          </div>


          {/* Trending Events Section */}
          <div className="flex justify-between items-center px-6 mt-12">
            <h2 className="text-black text-[30px] font-bold">Trending Events</h2>
            <div className="flex gap-[50px] text-primary font-semibold">
              <span>Technical</span>
              <span>Music</span>
              <span>Cultural</span>
              <span>Sports</span>
            </div>
          </div>
          <div className="w-full h-[370px] flex gap-[40px] px-0 py-0 mt-8 bg-background">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="bg-white h-full w-full p-4  rounded-[20px]">
              {/* Event Image with Heart Icon */}
              <div className="relative">
                <img src="/dbeimg2.jpg" alt="Event" className="w-full h-[200px] rounded-[18px]" />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                  ❤️
                </button>
              </div>

              {/* Event Details and Profile Images in the same row */}
              <div className="flex justify-between items-center mt-4 px-3 font-sans">
                <div>
                  <h3 className="text-[18px] font-bold">Abstract Colors</h3>
                  <p className="text-gray-600 text-[14px]">By Esthera Jackson</p>
                </div>
                {/* Participants & Age Restriction - Right Aligned */}
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <img src="/dbeimg3.jpg" alt="User 1" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="/dbeimg4.jpg" alt="User 2" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="/dbeimg5.jpg" alt="User 3" className="w-6 h-6 rounded-full border-2 border-white" />
                    <img src="/dbeimg6.jpg" alt="User 3" className="w-6 h-6 rounded-full border-2 border-white" />
                  </div>
                </div>
              </div>

              {/* Footer: Current Data (Left) & Register Button (Right) */}
              <div className="flex justify-between items-center px-3 mt-4">
                <span className="text-navy font-semibold cursor-pointer">Current Data</span>
                <button className="bg-navy text-white px-6 py-1.5 rounded-[50px]">Register</button>
              </div>
            </div>
          ))}
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DashEvents;

