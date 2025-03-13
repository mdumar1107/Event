import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Facebook, Twitter, Linkedin, MessageCircle  } from "lucide-react";

const Event = () => {
  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
      <div className="w-full h-[49px] mx-auto flex justify-between items-center ">
      <header className="w-[1200px] h-[49px] mx-auto flex justify-between items-center p-0 bg-background mt-6">
        <h1 className=" text-3xl font-bold font-sans">
          <Link to="/">
            Event <span className="text-primary">Hive</span>
          </Link>
        </h1>
        <div>
          <button onClick={() => window.location.href='/signin'} className="mr-4 text-black px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">Login </button>
          <button onClick={() => window.location.href='/signup'} className="bg-primary text-white px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">Signup</button>
        </div>
      </header>
      </div>

      {/* Hero Section */}
      <div className="w-full flex justify-center items-center mt-6 px-4 sm:px-0">
        <section
          className="w-full max-w-[1320px] h-[595px] bg-cover bg-center flex justify-center items-center relative rounded-2xl sm:w-[1320px] sm:h-[595px]"
          style={{ backgroundImage: "url('/img1.jpg')" }}
        >
          {/* Overlay Card */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl flex flex-col sm:flex-row px-5 sm:px-0">

            {/* Back Button */}
            <button className="absolute top-5 left-5 sm:left-[60px] bg-primary w-[79px] h-[40px] rounded-lg text-white text-sm">
              ← Back
            </button>

            {/* Content Wrapper */}
            <div className="w-full flex flex-col sm:flex-row justify-between px-4 sm:px-10 items-center">

              {/* Left Side: Event Details Card */}
              <div className="flex justify-center items-center w-full sm:w-1/2 mt-6 sm:mt-0">
                <div className="bg-transparent max-w-[600px] w-full sm:w-[600px] h-auto sm:h-[397px] rounded-2xl p-4 text-white text-center sm:text-left">
                  <h1 className="text-[32px] sm:text-[50px] font-bold leading-[40px] sm:leading-[60px] font-sans">
                    Dream world wide <br /> in Jakarta
                  </h1>
                  <h2 className="text-lg sm:text-2xl font-semibold mt-2">IIIT Sonepat</h2>
                  <p className="text-sm mt-3">
                    DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
                    The workshop taught participants the magic of creating stunning 3D models and 
                    animations using Blender. It was suitable for both beginners and experienced users.
                  </p>
                  <p className="text-sm mt-0">
                    The event was followed by a blender-render competition, which added to the excitement.
                  </p>
                  <button className="mt-4 flex items-center gap-2 text-white justify-center sm:justify-start">
                     View map
                  </button>
                </div>
              </div>

              {/* Right Side: Booking Card */}
              <div className="flex justify-center items-center w-full sm:w-1/2 mt-6 sm:mt-0">
                <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-[385px] h-auto sm:h-[338px] flex flex-col justify-between font-sans">
                  <div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-center sm:text-left">Date & time</h3>
                    <p className="text-gray-600 mt-2 sm:mt-4 text-center sm:text-left">Saturday, March 18 2023, 9:30PM</p>
                    <a href="#" className="text-primary mt-2 sm:mt-4 block text-center sm:text-left">Add to calendar</a>
                  </div>

                  <div className="mt-4">
                    <button className="w-full h-[45px] sm:h-[49px] bg-primary text-white py-2 rounded-lg text-md font-semibold">
                      Book now
                    </button>
                    <button className="mt-3 w-full h-[45px] sm:h-[49px] text-white bg-gray-300 py-2 rounded-lg text-md font-semibold">
                      Program promoter
                    </button>
                  </div>

                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">No Refunds</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

{/* Details Section */}
<div className="w-full h-auto flex justify-center items-center mt-40 py-8 sm:px-0 lg:px-0">
  <div className="w-full max-w-[1200px] bg-background p-0 sm:p-6 lg:p-0 flex flex-col md:flex-row justify-between font-sans">

    {/* Left Column */}
    <div className="w-full md:w-[55%] p-0">
      <h2 className="text-2xl font-bold px-0">Description</h2>
      <p className="text-gray-600 mt-6 leading-tight">
        DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
        The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
        It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
        which added to the excitement.
      </p>
      <p className="text-gray-600 mt-4 leading-tight">
        DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
        The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
        It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
        which added to the excitement.
      </p>

      {/* Hours */}
      <h2 className="text-2xl font-bold mt-8">Hours</h2>
      <p className="text-gray-600 mt-3">
        Weekdays hour: <span className="text-primary font-bold">7PM - 10PM</span>
      </p>
      <p className="text-gray-600 mt-3">
        Sunday hour: <span className="text-primary font-bold">7PM - 10PM</span>
      </p>

      {/* Organizer Contact */}
      <h2 className="text-2xl font-bold mt-8">Organizer Contact</h2>
      <p className="text-gray-600 mt-2">
        Please go to <a href="https://www.sneakypeeks.com" className="text-primary underline">www.sneakypeeks.com</a> 
        and refer to the FAQ section for more details.
      </p>
    </div>

    {/* Right Column */}
    <div className="w-full md:w-[40%] mt-10 md:mt-0">
      {/* Event Location */}
      <h2 className="text-2xl font-bold">Event location</h2>
      <div className="w-full h-[260px] bg-gray-200 rounded-lg mt-6">
        {/* Placeholder for Map Image */}
        <img src="/location.jpg" alt="Event Map" className="w-full h-full object-cover rounded-[40px]" />
      </div>
      <h3 className="text-2xl font-semibold mt-8">Dream world wide in Jakarta</h3>
      <p className="text-gray-600 mt-4 leading-tight">
        Dummy location generation model by RSU... Our approach generates more realistic dummy locations.
      </p>

      {/* Tags */}
      <h2 className="text-2xl font-bold mt-6">Tags</h2>
      <div className="flex flex-wrap gap-2 mt-2">
        {["Indonesia event", "Jaskaran event", "UI", "Jaskaran event", "Seminar", "Jaskaran event"].map((tag, index) => (
          <span key={index} className="bg-gray-100 w-auto h-[29px] text-black font-semibold px-3 py-1 rounded-lg text-sm">
            {tag}
          </span>
        ))}
      </div>

      {/* Share with friends */}
      <h2 className="text-2xl font-bold mt-8">Share with friends</h2>
      <div className="flex gap-4 mt-6">
        <a href="#" className="w-10 h-10">
          <img src="/facebook.png" alt="Facebook" className="w-full h-full object-contain rounded-lg" />
        </a>
        <a href="#" className="w-10 h-10">
          <img src="/whatsapp.png" alt="WhatsApp" className="w-full h-full object-contain rounded-lg" />
        </a>
        <a href="#" className="w-10 h-10">
          <img src="/linkden.jpg" alt="LinkedIn" className="w-full h-full object-contain rounded-lg" />
        </a>
        <a href="#" className="w-10 h-10">
          <img src="/twitter2.png" alt="Twitter" className="w-full h-full object-contain rounded-lg" />
        </a>
      </div>
    </div>

  </div>
</div>



      {/* Upcoming Events Section */}
        <section className="p-8 px-0 bg-background flex flex-col items-center mt-10 sm:mt-16">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
            {/* Title */}
            <h2 className="text-xl font-bold text-center md:text-left font-sans">
                Other events you may like
            </h2>
            </div>


      {/* Event Grid (2 Rows, 3 Columns) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0">
      {[
        { id: 1, image: "/img2.jpg" },
        { id: 2, image: "/img1.jpg" },
        { id: 3, image: "/img1.jpg" },
        { id: 4, image: "/img1.jpg" },
        { id: 5, image: "/img3.jpg" },
        { id: 6, image: "/img2.jpg" },
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
          <Link to="/">
            Event <span className="text-primary">Hive</span>
          </Link>
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

export default Event;
