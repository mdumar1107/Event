import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import EventCard from "../Components/EventCard";

const DashEvents = () => {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [events, setEvents] = useState([]); // Your created events
  const navigate = useNavigate();

  // Fetch booked events
  useEffect(() => {
    const fetchBookedEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/booking/bookings");
        console.log("API Response:", response.data);
        setBookedEvents(response.data);
      } catch (error) {
        console.error("Error fetching booked events:", error);
      }
    };

    fetchBookedEvents();
  }, []);

  // Fetch created events
  useEffect(() => {
    const fetchCreatedEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    fetchCreatedEvents();
  }, []);

  const handleEdit = (event) => {
    navigate(`/edit-event/${event._id}`, { state: { event } });
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventId}`);
        setEvents(events.filter((e) => e._id !== eventId));
      } catch (err) {
        console.error("Error deleting event:", err);
      }
    }
  };

  return (
    <div className="w-[1440px] h-[1580px] flex bg-gray-100 p-0">
      {/* Sidebar */}
      <div className="w-[250px] h-[1580px] bg-white flex flex-col items-center px-0 py-0 shadow-lg">
        <h1 className="text-primary text-center text-[27px] font-bold mt-4 px-6 py-4">Event Hive</h1>
        <nav className="w-full px-6 mt-8">
          <NavLink to="/dashboard" className={({ isActive }) => 
            `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>
            Dashboard
          </NavLink>
          <NavLink to="/dash-events" className={({ isActive }) => 
            `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>
            Events
          </NavLink>
          <NavLink to="/dash-messages" className={({ isActive }) => 
            `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>
            Messages
          </NavLink>
          <NavLink to="/dash-profile" className={({ isActive }) => 
            `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>
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
          <div className="w-[1130px] bg-background mt-4 p-0">
            {/* Events Booked Section */}
            <h2 className="text-purple-600 text-[30px] font-bold px-6 mt-8 font-sans">
              Events <span className="text-black">Booked</span>
            </h2>

            {bookedEvents.length > 0 ? (
              <div className="w-full flex overflow-x-auto gap-6 px-6 py-4 hide-scrollbar">
                {bookedEvents.map((booking, index) => (
                  <div key={index} className="bg-white w-[300px] h-[400px] p-4 rounded-[20px] flex-shrink-0 shadow-lg">
                    <div className="relative">
                      <img 
                        src={booking?.event?.image || "/default-event.jpg"} 
                        alt={booking?.event?.name || "Event"} 
                        className="w-full h-[200px] rounded-[18px] object-cover"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="text-[18px] font-bold">{booking?.event?.name || "Unknown Event"}</h3>
                      <p className="text-gray-600 text-[14px]">By {booking?.user?.name || "Unknown User"}</p>
                      <p className="text-gray-600 text-[14px]">Age: {booking?.user?.age || "N/A"}</p>
                      <p className="text-gray-600 text-[14px]">Gender: {booking?.user?.gender || "N/A"}</p>
                      <p className="text-gray-600 text-[14px]">Email: {booking?.user?.email || "N/A"}</p>
                      <p className="text-gray-600 text-[14px]">Phone: {booking?.user?.phone || "N/A"}</p>
                      <p className="text-gray-600 text-[14px] font-semibold">Tickets: {booking?.tickets || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-600">
                <img src="/no-events.svg" alt="No Events" className="w-[200px] h-[200px] mb-4" />
                <p className="text-lg">No events participated yet.</p>
              </div>
            )}

            {/* Your Created Events Section */}
            <h2 className="text-purple-600 text-[30px] font-bold font-sans mt-10 mb-4 px-6">
              Your <span className="text-black">Events</span>
            </h2>

            {events.length > 0 ? (
              <div className="w-full flex overflow-x-auto gap-6 px-6 py-4 hide-scrollbar">
                {events.map((event) => (
                  <div key={event._id} className="flex-shrink-0">
                    <EventCard
                      event={event}
                      isDashboard={true}
                      onEdit={() => handleEdit(event)}
                      onDelete={() => handleDelete(event._id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] text-gray-600">
                <img src="/no-events.svg" alt="No Events" className="w-[200px] h-[200px] mb-4" />
                <p className="text-lg">No events found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashEvents;
