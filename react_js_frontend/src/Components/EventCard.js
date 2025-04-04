import React from "react";

const EventCard = ({ event, isDashboard = false, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-5">
      {/* Event Image */}
      <div className="relative w-full flex justify-center">
        <img
          src={`http://localhost:5000${event.imageUrl}`}
          alt={event.title}
          className="w-full h-[240px] object-cover rounded-lg"
        />
      </div>

      {/* Event Info */}
      <div className="mt-4 text-left">
        <h3 className="text-2xl font-bold leading-tight text-black font-sans">
          {event.title}
        </h3>
        <div className="text-[18px] font-normal mt-2">{event.description}</div>
        <p className="text-[15px] font-medium text-primary font-sans mt-3">
          <span className="text-black">Date : </span>
          {`${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`} - 
          {`${event.endDate.day}-${event.endDate.month}-${event.endDate.year}`}<br />
          <span className="text-black">Time : </span>
          {`${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`} - 
          {`${event.endTime.hour}:${event.endTime.minute} ${event.endTime.period}`}
        </p>
        <p className="text-[15px] text-gray-800 mt-8">
          <span className="text-black font-semibold">Location : </span>
          {event.venue}
        </p>

        {/* 🔹 Show Edit/Delete Only on Dashboard */}
        {isDashboard && (
          <div className="flex justify-between mt-4">
            <button
              onClick={() => onEdit(event)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
