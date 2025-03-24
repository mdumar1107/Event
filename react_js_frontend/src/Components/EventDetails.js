import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userFullName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    numTickets: 1,
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ticketUrl, setTicketUrl] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError("Failed to load event details.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/booking/book", {
        eventId: event._id,
        ...bookingDetails,
        cardDetails: {
          cardNumber: bookingDetails.cardNumber,
          expiryDate: bookingDetails.expiryDate,
          cvv: bookingDetails.cvv,
        },
      });
  
      console.log("Raw Ticket URL:", response.data.ticketUrl); // Debugging
  
      let fullTicketUrl = response.data.ticketUrl;
  
      // Ensure the URL starts correctly
      if (!fullTicketUrl.startsWith("http")) {
        fullTicketUrl = `http://localhost:5000${fullTicketUrl}`;
      }
  
      setBookingSuccess(true);
      setTicketUrl(fullTicketUrl);
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error.message);
      alert("Booking Failed!");
    }
  };
  
  

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!event) return <p className="text-red-600">Event not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      {bookingSuccess ? (
        <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Booking Successful! 🎉</strong>
          <p className="text-sm">Your ticket has been generated.</p>
          <button onClick={() => window.open(ticketUrl, "_blank")} className="block mt-3 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Download Ticket
          </button>
        </div>
      ) : (
        <>
          <img src={`http://localhost:5000${event.imageUrl}`} alt={event.title} className="w-full h-64 object-cover rounded-lg"/>
          <h2 className="text-3xl font-bold mt-4">{event.title}</h2>
          <p className="text-gray-600">{event.description}</p>
          <p><strong>Date:</strong> {`${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`}</p>
          <p><strong>Time:</strong> {`${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`}</p>
          <p><strong>Venue:</strong> {event.venue}</p>

          {/* Booking Form */}
          <h3 className="text-xl font-semibold mt-6">Book Your Tickets</h3>
          <input type="text" name="userFullName" placeholder="Full Name" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          <input type="number" name="age" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          <select name="gender" onChange={handleChange} className="w-full p-2 border rounded mt-2">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          
          <label className="mt-4">Number of Tickets (Max 3 per person)</label>
          <select name="numTickets" onChange={handleChange} className="w-full p-2 border rounded mt-2">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>

          {/* Payment Details */}
          <h3 className="text-xl font-semibold mt-6">Payment Details</h3>
          <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>
          <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} className="w-full p-2 border rounded mt-2"/>

          <button onClick={handleBooking} className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Book Now</button>
        </>
      )}
    </div>
  );
};

export default EventDetails;
