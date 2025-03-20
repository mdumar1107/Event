import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";

const CreateEvents = () => {
  const [eventData, setEventData] = useState({
    title: "",
    venue: "",
    startTime: { hour: "", minute: "", period: "" },
    endTime: { hour: "", minute: "", period: "" },
    startDate: { day: "", month: "", year: "" },
    endDate: { day: "", month: "", year: "" },
    description: "",
    imageFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEventData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  const handleDropdownChange = (e, field, subField) => {
    const { value } = e.target;
    setEventData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
      if (key === "imageFile") {
        formData.append("image", eventData.imageFile);
      } else if (typeof eventData[key] === "object") {
        formData.append(key, JSON.stringify(eventData[key]));
      } else {
        formData.append(key, eventData[key]);
      }
    });

    try {
      const response = await axios.post("http://localhost:5000/api/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Error creating event");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center font-sans px-4 sm:px-0">
      {/* Header */}
      <div className="w-full  ">
        <Header /> 
      </div>

      {/* Create Event Card */}
      <div className="w-full sm:w-[816px] bg-background p-0 flex flex-col items-center mt-12 font-sans py-4">
        <h2 className="text-3xl font-bold text-center mb-6">Create Event</h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Event Title</label>
          <input type="text" name="title" value={eventData.title} onChange={handleChange} placeholder="Enter your title" className="w-full p-3 rounded-sm text-sm border" />

          <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Event Venue</label>
          <input type="text" name="venue" value={eventData.venue} onChange={handleChange} placeholder="Enter your venue" className="w-full p-3 rounded-sm text-sm border" />

         {/* Time Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["startTime", "endTime"].map((field) => (
              <div key={field}>
                <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">
                  {field === "startTime" ? "Start Time" : "End Time"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select className="p-2 border rounded" value={eventData[field].hour} onChange={(e) => handleDropdownChange(e, field, "hour")}>
                    <option value="">Hour</option>
                    {[...Array(12).keys()].map((h) => <option key={h+1} value={h+1}>{h+1}</option>)}
                  </select>
                  <select className="p-2 border rounded" value={eventData[field].minute} onChange={(e) => handleDropdownChange(e, field, "minute")}>
                    <option value="">Minute</option>
                    {["00", "15", "30", "45"].map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <select className="p-2 border rounded" value={eventData[field].period} onChange={(e) => handleDropdownChange(e, field, "period")}>
                    <option value="">AM/PM</option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* Date Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["startDate", "endDate"].map((field) => (
              <div key={field}>
                <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">
                  {field === "startDate" ? "Start Date" : "End Date"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <select className="p-2 border rounded" value={eventData[field].day} onChange={(e) => handleDropdownChange(e, field, "day")}>
                    <option value="">Day</option>
                    {[...Array(31).keys()].map((d) => <option key={d+1} value={d+1}>{d+1}</option>)}
                  </select>
                  <select className="p-2 border rounded" value={eventData[field].month} onChange={(e) => handleDropdownChange(e, field, "month")}>
                    <option value="">Month</option>
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m, i) => <option key={i+1} value={i+1}>{m}</option>)}
                  </select>
                  <select className="p-2 border rounded" value={eventData[field].year} onChange={(e) => handleDropdownChange(e, field, "year")}>
                    <option value="">Year</option>
                    {[...Array(10).keys()].map((y) => <option key={y} value={2025 + y}>{2025 + y}</option>)}
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* File Upload */}
          <div className="mt-8 w-full">
            <label className="block font-semibold text-gray-900 text-sm mb-2">Upload Event Image</label>
            <input type="file" onChange={handleFileChange} className="w-full p-2 border rounded" />
          </div>

          {/* Event Description */}
          <div className="mt-6 w-full">
            <label className="block font-semibold text-gray-900 text-sm mb-2">Event Description</label>
            <textarea name="description" value={eventData.description} onChange={handleChange} placeholder="Type here..." className="w-full p-3 border rounded-lg h-[173px]"></textarea>
          </div>

          {/* Create Event Button */}
          <button type="submit" className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-lg">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
