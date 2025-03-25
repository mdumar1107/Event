import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//import pdfkit from "pdfkit"

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
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ticketUrl, setTicketUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch Event Details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
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

  // Handle Input Change
  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Booking and Payment
  const handleBooking = async () => {
    // Validate form inputs
    if (!bookingDetails.userFullName || !bookingDetails.email || !bookingDetails.phoneNumber) {
      alert("Please fill in all required fields");
      return;
    }

    setIsProcessing(true);

    try {
      // Load Razorpay script
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      // Ensure Razorpay is available
      if (!window.Razorpay) {
        throw new Error("Razorpay not available");
      }

      // Create order (amount should be in paise - 1 INR = 100 paise)
      const amountPerTicket = event?.price || 250; // Fallback to 250 if no price
      const totalAmount = amountPerTicket * bookingDetails.numTickets * 100;

      const orderResponse = await axios.post(
        "http://localhost:5000/api/booking/create-order",
        { amount: totalAmount }
      );

      const { id: orderId, amount, currency } = orderResponse.data;

      // Razorpay options
      const options = {
        key: "rzp_test_GAxEunqv37GZb9", // Replace with your test/live key
        amount: amount,
        currency: currency,
        name: "EventHive",
        description: `Booking for ${event.title}`,
        order_id: orderId,
        prefill: {
          name: bookingDetails.userFullName,
          email: bookingDetails.email,
          contact: bookingDetails.phoneNumber,
        },
        theme: {
          color: "#3399cc"
        },
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:5000/api/booking/verify-payment",
              {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                bookingDetails: {
                  ...bookingDetails,
                  eventId: event._id,
                  amount: totalAmount / 100, // Convert back to INR
                },
              }
            );

            if (verifyResponse.data.success) {
              setBookingSuccess(true);
              setTicketUrl(verifyResponse.data.ticketUrl);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Error verifying payment. Please contact support.");
          }
        },
        modal: {
          ondismiss: function () {
            alert("Payment was cancelled. You can try again.");
          },
        },
      };

      // Open Razorpay modal
      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      razorpay.on("payment.failed", function (response) {
        alert(`Payment failed: ${response.error.description}`);
      });

    } catch (error) {
      console.error("Payment Error:", error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const generatePDF = () => {
    const ticketContent = document.getElementById("ticket-content");
  
    if (!ticketContent) {
      console.error("Ticket content not found!");
      return;
    }
  
    html2canvas(ticketContent).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save("event-ticket.pdf");
    });
  };
  
  if (loading) return <div className="text-center py-10">Loading event details...</div>;
  if (error) return <div className="text-red-600 text-center py-10">{error}</div>;
  if (!event) return <div className="text-red-600 text-center py-10">Event not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-5">
      {bookingSuccess ? (
        <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Booking Successful! 🎉</strong>
          <p className="text-sm">Your ticket has been generated.</p>
          {bookingSuccess && (
  <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
    <strong className="font-bold">Booking Successful! 🎉</strong>
    <p className="text-sm">Your ticket has been generated.</p>

    {/* Ticket Content for PDF */}
    <div id="ticket-content" className="p-4 bg-white border rounded shadow-md mt-3">
      <h2 className="text-xl font-bold">{event.title}</h2>
      <p><strong>Date:</strong> {`${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`}</p>
      <p><strong>Time:</strong> {`${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Attendee:</strong> {bookingDetails.userFullName}</p>
      <p><strong>Email:</strong> {bookingDetails.email}</p>
      <p><strong>Phone:</strong> {bookingDetails.phoneNumber}</p>
      <p><strong>Tickets:</strong> {bookingDetails.numTickets}</p>
      <p><strong>Total Amount:</strong> ₹{(event.price || 250) * bookingDetails.numTickets}</p>
    </div>

    <button
      onClick={generatePDF}
      className="block mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
    >
      Download Ticket
    </button>
  </div>
)}

        </div>
      ) : (
        <>
          <img
            src={`http://localhost:5000${event.imageUrl}`}
            alt={event.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
          <p className="text-gray-600 mb-4">{event.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
            <p><strong>Date:</strong> {`${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`}</p>
              <p><strong>Time:</strong> {`${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`}</p>

            </div>
            <div>
              <p><strong>Venue:</strong> {event.venue}</p>
              <p><strong>Price:</strong> ₹{event.price || 250} per ticket</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Book Your Tickets</h3>
            
            <div className="space-y-3">
              <input
                type="text"
                name="userFullName"
                placeholder="Full Name *"
                value={bookingDetails.userFullName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={bookingDetails.age}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  min="1"
                />
                
                <select
                  name="gender"
                  value={bookingDetails.gender}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={bookingDetails.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={bookingDetails.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              
              <div>
                <label className="block mb-1">Number of Tickets (Max 3)</label>
                <select
                  name="numTickets"
                  value={bookingDetails.numTickets}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  {[1, 2, 3].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'ticket' : 'tickets'} (₹{(event.price || 250) * num})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <button
              onClick={handleBooking}
              disabled={isProcessing}
              className={`w-full mt-4 py-2 px-4 rounded text-white font-medium ${
                isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;