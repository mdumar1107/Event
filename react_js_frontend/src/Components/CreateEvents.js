import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CreateEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    venue: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/events/create", eventData);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center font-sans px-4 sm:px-0">
      {/* Header */}
      <header className="w-full max-w-[1200px] h-[49px] mx-auto flex justify-between items-center p-6 bg-background mt-6">
        <h1 className="text-3xl font-bold font-sans">
          <Link to="/">
            Event <span className="text-primary">Hive</span>
          </Link>
        </h1>
        <div>
          <button onClick={() => window.location.href='/signin'} className="mr-4 text-black px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">
            Login
          </button>
          <button onClick={() => window.location.href='/signup'} className="bg-primary text-white px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">
            Signup
          </button>
        </div>
      </header>

      {/* Create Event Card */}
      <div className="w-full sm:w-[816px] bg-background p-0 flex flex-col items-center mt-12 font-sans">
        <h2 className="text-3xl font-bold text-center mb-6">Create Event</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Event Title</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="Enter your title" className="w-full p-3 rounded-sm text-sm border" />

          <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Event Venue</label>
          <input type="text" name="venue" value={eventData.venue} onChange={handleChange} placeholder="Enter your venue" className="w-full p-3 rounded-sm text-sm border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Start time</label>
              <input type="text" name="startTime" value={eventData.startTime} onChange={handleChange} placeholder="Enter time" className="w-full p-3 rounded-sm text-sm border" />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">End time</label>
              <input type="text" name="endTime" value={eventData.endTime} onChange={handleChange} placeholder="Enter time" className="w-full p-3 rounded-sm text-sm border" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Start date</label>
              <input type="text" name="startDate" value={eventData.startDate} onChange={handleChange} placeholder="Enter date" className="w-full p-3 rounded-sm text-sm border" />
            </div>
            <div>
              <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">End date</label>
              <input type="text" name="endDate" value={eventData.endDate} onChange={handleChange} placeholder="Enter date" className="w-full p-3 rounded-sm text-sm border" />
            </div>
          </div>
        </form>
      </div>

      {/* Event Description Card */}
      <div className="w-full sm:w-[813px] bg-background p-4 sm:p-0 flex flex-col mt-12">
        <h3 className="text-3xl font-bold text-center">Event Description</h3>

        <div className="mt-8 w-full">
          <label className="block font-semibold text-gray-900 text-sm mb-2">Event Image</label>
          <div className="w-full h-[254px] bg-gray-200 rounded-lg flex items-center justify-center"></div>
        </div>

        <div className="mt-6 w-full">
          <label className="block font-semibold text-gray-900 text-sm mb-2">Event Description</label>
          <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Type here..." className="w-full p-3 border rounded-lg h-[173px]"></textarea>
        </div>

        <button type="submit" className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-lg" onClick={handleSubmit}>
          Create event
        </button>
      </div>
    </div>
  );
};

export default CreateEvents;
