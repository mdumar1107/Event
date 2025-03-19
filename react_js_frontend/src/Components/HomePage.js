import React, { useState, useEffect } from "react";
import { FaSearch, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]); // Store fetched events
  const [visibleEvents, setVisibleEvents] = useState(6); // Initially show 6 events
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }

    // Fetch upcoming events from backend
    axios.get("http://localhost:5000/api/events")
  .then((response) => {
    const sortedEvents = response.data.sort((a, b) => {
      const dateA = new Date(`${a.startDate.year}-${a.startDate.month}-${a.startDate.day}`);
      const dateB = new Date(`${b.startDate.year}-${b.startDate.month}-${b.startDate.day}`);
      return new Date(dateA.year, dateA.month - 1, dateA.day) - new Date(dateB.year, dateB.month - 1, dateB.day);//latest to the first

    });
    setEvents(sortedEvents);
  })
  .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };


  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
<div className="w-full h-[49px] mx-auto flex justify-between items-center">
  <header className="w-[1200px] h-[49px] mx-auto flex justify-between items-center p-0 bg-background mt-6">
    <h1 className="text-3xl font-bold">
      Event <span className="text-primary">Hive</span>
    </h1>
    <div>
      {user ? (
        <>
          <span className="mr-4 text-lg font-semibold text-gray-700">{user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 sm:text-[16px] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
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

      {/* Hero Section */}
      <div className="w-full flex justify-center items-center mt-6">
        <section 
          className="w-[1320px] h-[596px] bg-cover bg-center flex justify-center items-center text-white text-4xl font-bold rounded-2xl"
          style={{ backgroundImage: "url('/event_image.jpg')" }}
        >
          {/* Left Arrow */}
          <button className="absolute left-[120px] top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-80">
            <FaChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Right Arrow */}
          <button className="absolute right-[120px] top-1/2 transform -translate-y-1/2 p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-80 ">
            <FaChevronRight className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[50px] font-bold text-white text-center leading-[60px] translate-y-[-100px]">
            MADE FOR THOSE <br /> WHO DO 
          </h1>
        </section>
      </div>


    {/* Event Search Bar */}
    <div className="w-full flex justify-center px-0">
      <div className="bg-navy w-full max-w-[1200px] p-7 flex flex-col sm:flex-col md:flex-row justify-center gap-10  rounded-2xl relative -top-16 mx-auto shadow-lg text-white">
        
        {/* Looking For */}
        <div className="flex flex-col w-full md:w-[290px]">
          <label className="mb-2 text-sm font-medium">Looking for</label>
          <select className="p-2 rounded-md text-sm bg-background text-navy w-full h-[40px]">
            <option>Choose event type</option>
          </select>
        </div>

        {/* Location */}
        <div className="flex flex-col w-full md:w-[290px]">
          <label className="mb-2 text-sm font-medium">Location</label>
          <select className="p-2 rounded-md bg-background text-navy text-sm w-full h-[40px]">
            <option>Choose location</option>
          </select>
        </div>

        {/* When */}
        <div className="flex flex-col w-full md:w-[290px]">
          <label className="mb-2 text-sm font-medium">When</label>
          <select className="p-2 rounded-md text-sm bg-background text-navy w-full h-[40px]">
            <option>Choose date and time</option>
          </select>
        </div>

        {/* Search Button */}
        <button className="bg-primary p-0 rounded-lg text-white flex items-center justify-center w-full md:w-[70px] h-[70px]">
          <FaSearch size={20} />
        </button>
      </div>
    </div>


  {/* Upcoming Events Section */}
  <section className="py-12 bg-background flex flex-col items-center mt-12">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center md:text-left">
            Upcoming <span className="text-primary">Events</span>
          </h2>

          {/* Filters */}
          <div className="w-full md:w-[460px] flex flex-col sm:flex-col md:flex-row gap-4 mt-4 md:mt-0">
            {["Weekdays", "Event type", "Any category"].map((option, index) => (
              <select key={index} className="p-2 rounded-md bg-gray-200 text-black text-sm w-full md:w-[140px] h-[40px]">
                <option>{option}</option>
              </select>
            ))}
          </div>
        </div>

        {/* 🔹 Event Grid (Now Uses Fetched Events) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0 py-0">
          {events.slice(0, visibleEvents).map((event) => (
            <div key={event._id} className="bg-white shadow-lg rounded-xl overflow-hidden p-5">
              {/* Image Container */}
              <div className="relative w-full flex justify-center">
              <img src={`http://localhost:5000${event.imageUrl}`} alt={event.title} className="w-full h-[240px] object-cover rounded-lg"/>
                  <span className="absolute top-2 left-2 bg-white text-primary text-xs font-semibold px-2 py-1 rounded">
                  FREE
                </span>
              </div>

              {/* Event Content (Dynamic Data) */}
              <div className="mt-4 text-left ">
                <h3 className="text-2xl font-bold leading-tight text-black font-sans">
                  {event.title}
                </h3>
                <div className="text-[18px] font-normal mt-2 ">{event.description}</div>
                <p className="text-[15px] font-medium text-primary  font-sans mt-3">
                  <span className="text-black">Date : </span>
                  {`${event.startDate.day}-${event.startDate.month}-${event.startDate.year}`} - 
                  {`${event.endDate.day}-${event.endDate.month}-${event.endDate.year}`},<br />
                  <span className="text-black">Time : </span>
                  {`${event.startTime.hour}:${event.startTime.minute} ${event.startTime.period}`} - 
                  {`${event.endTime.hour}:${event.endTime.minute} ${event.endTime.period}`}
                </p>
                <p className="text-[15px] text-gray-800 mt-8 ">
                <span className="text-black font-semibold">Location : </span>
                  {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 🔹 Load More Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleEvents((prev) => prev + 3)}
            className={`px-6 py-2 rounded-lg mt-9 ${
              visibleEvents >= events.length
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-primary text-white hover:bg-slate-200 hover:text-slate-900"
            }`}
            disabled={visibleEvents >= events.length}
          >
            {visibleEvents >= events.length ? "No more events" : "Load more..."}
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
<section className="py-12 bg-background flex flex-col items-center mt-12 px-0">
  <div className="max-w-[1200px] w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-6 px-0">
    {/* Title */}
    <h2 className="text-3xl font-bold text-center md:text-left">
      Trending <span className="text-primary">Colleges</span>
    </h2>
  </div>

  {/* Colleges Grid - Responsive */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0 md:p-0">
    {[        
      {
        id: 1,
        name: "Harvard University",
        location: "Cambridge, Massachusetts, UK",
        image: "/harward.png",
        rating: 4.8,
      },
      {
        id: 2,
        name: "Stanford University",
        location: "Stanford, California, USA",
        image: "/stanford.png",
        rating: 4.9,
      },
      {
        id: 3,
        name: "Nanyang University",
        location: "Nanyang Ave, Singapore",
        image: "/nanyang.png",
        rating: 4.7,
      },
    ].map((college) => (
      <div key={college.id} className="bg-white shadow-lg rounded-xl overflow-hidden w-full h-auto sm:h-[495px] relative">
        {/* Image Container */}
        <div className="relative w-full">
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-[331px] object-cover"
          />

          {/* Bottom Left - Rating */}
          <div className="absolute left-[5%] bottom-[13%] sm:left-[26px] sm:bottom-[65px] md:left-[26px] md:bottom-[80px] bg-white flex items-center px-3 py-1 rounded-full shadow-md">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-1 font-semibold text-black">{college.rating}</span>
          </div>

          {/* Bottom Right - Exclusive Tag */}
          <div className="absolute right-[5%] bottom-[23%] sm:left-[247.67px] sm:bottom-[65px] md:left-[270px] md:bottom-[80px] bg-black text-white px-3 py-1 text-sm rounded-full">
            EXCLUSIVE
          </div>
        </div>

        {/* College Content */}
        <div className="p-5 text-left md:p-4">
          <h3 className="text-2xl font-bold">{college.name}</h3>

          {/* Location & Dotted Menu in the Same Line */}
          <div className="flex justify-between items-center mt-4 sm:mt-12 md:mt-6">
            <p className="text-black text-sm font-bold">{college.location}</p>

            {/* Dotted Menu Button */}
            <button className="text-black font-bold text-2xl">...</button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Load More Button */}
  <div className="flex justify-center mt-8">
    <button className="bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-purple-600 hover:scale-105">
    <button onClick={() => window.location.href='/trendingcollege'} >Load More</button>
    </button>
  </div>
</section>


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
<footer className="bg-navy text-white p-12 text-center w-full min-h-[334px] flex flex-col justify-between">
  {/* Branding */}
  <h2 className="text-3xl font-bold">
    Event <span className="text-primary">Hive</span>
  </h2>

  {/* Email Subscription Form */}
  <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
    <input
      type="email"
      placeholder="Enter your mail"
      className="p-3 rounded-md w-full sm:w-auto sm:flex-1 outline-none text-black"
    />
    <button className="bg-primary text-white px-6 py-2 rounded-md w-full sm:w-auto hover:bg-purple-600">
      Subscribe
    </button>
  </div>

  {/* Navigation Links */}
  <div className="flex justify-center gap-6 mt-6 text-lg font-medium flex-wrap">
    <a href="#" className="hover:text-purple-400">Home</a>
    <a href="#" className="hover:text-purple-400">About</a>
    <a href="#" className="hover:text-purple-400">Services</a>
    <a href="#" className="hover:text-purple-400">Get in touch</a>
    <a href="#" className="hover:text-purple-400">FAQs</a>
  </div>

  {/* Divider */}
  <hr className="mt-6 border-t border-gray-400 w-4/5 mx-auto" />

  {/* Bottom Section (Language, Social Media, Copyright) */}
  <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[1200px] mx-auto mt-4 text-sm">
    {/* Language Selection - Left (Mobile: Centered) */}
    <div className="flex gap-4 mb-4 sm:mb-0">
      <button className="bg-primary text-white px-3 py-1 rounded-md">English</button>
      <button className="text-gray-300 hover:text-white">French</button>
      <button className="text-gray-300 hover:text-white">Hindi</button>
    </div>

    {/* Social Media Icons - Centered */}
    <div className="flex gap-6 text-2xl mb-4 sm:mb-0">
      <FaLinkedin className="cursor-pointer hover:text-purple-400" />
      <FaInstagram className="cursor-pointer hover:text-purple-400" />
      <FaFacebook className="cursor-pointer hover:text-purple-400" />
    </div>

    {/* Copyright Text - Right (Mobile: Centered) */}
    <p className="text-gray-300 text-sm text-center sm:text-right">
      Non-Copyrighted © 2023 Upload by EventHive
    </p>
  </div>
</footer>

    </div>
  );
};

export default HomePage;
