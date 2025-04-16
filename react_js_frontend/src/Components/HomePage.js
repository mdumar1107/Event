import React, { useState, useEffect } from "react";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import EventCard from "../Components/EventCard";
import TrendingColleges from "../Components/TrendingCollege";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        // Format the date properly with leading zeros
        const formatDate = ({ year, month, day }) =>
          new Date(`${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`);
  
        // Sort by latest to oldest
        const sortedEvents = response.data.sort((a, b) => {
          const dateA = formatDate(a.startDate);
          const dateB = formatDate(b.startDate);
          return dateB - dateA;
        });
  
        setEvents(sortedEvents);
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  

  const filteredEvents = events.filter((event) => {
    const titleMatch = (event.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const locationMatch = (event.venue || "").toLowerCase().includes(searchLocation.toLowerCase());
  
    const { startDate } = event;
  
    // Format event date into yyyy-mm-dd (same as the input type="date")
    const eventDate = startDate
      ? `${startDate.year}-${String(startDate.month).padStart(2, "0")}-${String(startDate.day).padStart(2, "0")}`
      : "";
  
    const dateMatch = searchDate ? eventDate === searchDate : true;
  
    return titleMatch && locationMatch && dateMatch;
  });
  
  
  return (
    <div className="font-sans bg-background">
      {/* Header */}
      <Header />

      {/* Hero */}
      <div className="w-full flex justify-center items-center mt-6">
        <section
          className="w-[1320px] h-[596px] bg-cover bg-center flex justify-center items-center text-white text-4xl font-bold rounded-2xl"
          style={{ backgroundImage: "url('/event_image.jpg')" }}
        >
          {/* Arrows */}
          <button className="absolute left-[120px] top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-80">
            <FaChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button className="absolute right-[120px] top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-80">
            <FaChevronRight className="w-6 h-6 text-white" />
          </button>

          <h1 className="text-[50px] font-bold text-white text-center leading-[60px] translate-y-[-100px]">
            MADE FOR THOSE <br /> WHO DO
          </h1>
        </section>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center px-0">
        <div className="bg-navy w-full max-w-[1200px] p-7 flex flex-col sm:flex-col md:flex-row justify-center gap-10 rounded-2xl relative -top-16 mx-auto shadow-lg text-white">
          {/* Search Event */}
          <div className="flex flex-col w-full md:w-[290px]">
            <label className="mb-2 text-sm font-medium">Looking for</label>
            <input
              type="text"
              placeholder="Search event name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 rounded-md text-sm bg-background text-navy w-full h-[40px]"
            />
          </div>

          {/* Search Location */}
          <div className="flex flex-col w-full md:w-[290px]">
            <label className="mb-2 text-sm font-medium">Location</label>
            <input
              type="text"
              placeholder="Search location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="p-2 rounded-md text-sm bg-background text-navy w-full h-[40px]"
            />
          </div>

          {/* Search Date */}
          <div className="flex flex-col w-full md:w-[290px]">
            <label className="mb-2 text-sm font-medium">Date</label>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="p-2 rounded-md text-sm bg-background text-navy w-full h-[40px]"
            />
          </div>

          {/* Search Icon */}
          <button
            className="bg-primary p-0 rounded-lg text-white flex items-center justify-center w-full md:w-[70px] h-[70px]"
            onClick={() => {}}
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Events Section */}
      <section className="py-12 bg-background flex flex-col items-center mt-12">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
          <h2 className="text-3xl font-bold text-center md:text-left">
            Upcoming <span className="text-primary">Events</span>
          </h2>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0 py-0">
          {filteredEvents.slice(0, visibleEvents).map((event) => (
            <Link to={`/event/${event._id}`} key={event._id}>
              <EventCard event={event} />
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleEvents((prev) => prev + 3)}
            className={`px-6 py-2 rounded-lg mt-9 ${
              visibleEvents >= filteredEvents.length
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-slate-200 hover:text-slate-900"
            }`}
            disabled={visibleEvents >= filteredEvents.length}
          >
            {visibleEvents >= filteredEvents.length ? "No more events" : "Load more..."}
          </button>
        </div>
      </section>
    {/* Create Your Event Section */}
<div className="w-full bg-background mt-24">
  <div className="w-full h-auto md:h-[252px] flex justify-center items-center bg-navy py-12">
    <section className="text-white px-6 md:px-16 flex flex-col md:flex-row justify-between items-center w-full max-w-6xl">

      {/* Left Side - Illustration */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img 
          src="crtevnt.png" 
          alt="Event Illustration" 
          className="max-w-[90%] sm:max-w-[70%] md:max-w-[544.67px] h-auto md:h-[303px] object-contain transform md:translate-y-[-25px] md:translate-x-[-50px]"
        />
      </div>

      {/* Right Side - Text Content */}
      <div className="w-full md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          Make your own Event
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg text-white max-w-[382px] h-auto mx-auto md:mx-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Conditional Rendering for Button */}
        <div className="flex justify-center md:justify-start">
          {user ? (
            <button 
              onClick={() => navigate('/create-events')}
              className="mt-6 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-purple-600 hover:scale-105 w-[80%] sm:w-[60%] md:w-[302px] h-[60px]"
            >
              Create Event
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 px-6 py-3 bg-primary text-white text-lg font-semibold rounded-lg transition duration-300 ease-in-out hover:bg-gray-600 hover:scale-105 w-[80%] sm:w-[60%] md:w-[302px] h-[60px]"
            >
              Login to Create Event
            </button>
          )}
        </div>
      </div>

    </section>
  </div>
</div>


     {/* Brand Logos Section */}
<section className="w-full max-w-[1200px] mx-auto text-center py-12 mt-12 px-0">
  {/* Title */}
  <h2 className="text-4xl font-bold mx-auto bg-background">
    Join these <span className="text-primary">brands</span>
  </h2>
  <p className="mt-9 text-black text-lg mx-auto text-center font-semibold leading-tight max-w-[655px]">
    We've had the pleasure of working with industry-defining brands. These are just some of them.
  </p>

  {/* Logos Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 mt-12 place-items-left">
    {[
      { src: "/Spotify.png", alt: "Spotify" },
      { src: "/google.png", alt: "Google" },
      { src: "/Stripe.png", alt: "Stripe" },
      { src: "/YouTube.png", alt: "YouTube" },
      { src: "/Microsoft.png", alt: "Microsoft" },
      { src: "/Medium.png", alt: "Medium" },
      { src: "/Zoom.png", alt: "Zoom" },
      { src: "/Uber.png", alt: "Uber" },
      { src: "/grab.png", alt: "Grab" },
    ].map((brand, index) => (
      <div key={index} className="bg-background p-4 rounded-lg ">
        <img src={brand.src} alt={brand.alt} className="w-[181.72px] h-[38.64px] object-contain" />
      </div>
    ))}
  </div>
</section>



{/* Trending Colleges Section */}
<div className="container mx-auto px-4">
  {/* Other sections like search bar and events list */}
  
  {/* Trending Colleges Section */}
  <TrendingColleges />

  {/* Maybe more sections like footer */}
</div>


  {/* Our Blogs Section */}
  <section className="py-12 px-0 bg-background flex flex-col items-center mt-12">
    <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0 sm:px-0 md:px-0">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center md:text-left">
        Our <span className="text-primary">Blogs</span>
      </h2>
    </div>

  {/* Event Grid (2 Rows, 3 Columns) */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0">
      {[
        { id: 1, image: "/img2.jpg" },
        { id: 2, image: "/img1.jpg" },
        { id: 3, image: "/img1.jpg" },
      ].map((event) => (
        <div key={event.id} className="bg-white shadow-lg rounded-xl overflow-hidden p-5">
          {/* Image Container */}
          <div className="relative w-full flex justify-center">
            <img
              src={event.image}
              alt={`Event ${event.id}`}
              className="w-full h-[240px] object-cover rounded-lg"
            />
            <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
              FREE
            </span>
          </div>

          {/* Event Content (Kept Inside the Card) */}
          <div className="mt-4 text-left space-y-2">
            <h3 className="text-md font-semibold leading-tight text-black">
              BestSeller Book Bootcamp - Write, Market & Publish Your Book - Lucknow
            </h3>
            <p className="text-xs font-medium text-primary leading-[2.5]">
              Saturday, March 18, 9:30PM
            </p>
            <p className="text-xs text-gray-600">
              ONLINE EVENT - Attend anywhere
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>



      {/* Footer Section */}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
