import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const AllEvents = () => {
  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
      <div className="w-full h-[49px] mx-auto flex justify-between items-center ">
      <header className="w-[1200px] h-[49px] mx-auto flex justify-between items-center p-6 px-0 bg-background mt-6">
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
    <section className="lg:w-[1440px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between mt-10 relative 
        lg:overflow-visible md:overflow-hidden sm:overflow-hidden overflow-hidden max-w-full">
        
        {/* Left Content Card */}
        <div className="w-1/2 lg:w-[50%] bg-background py-0 px-[120px] lg:px-[122px] md:px-12 sm:px-6 text-center md:text-center lg:text-left flex flex-col items-center lg:items-start">
            <p className="text-[15px] text-black font-semibold">
                Thriving Above Event Expectations.
            </p>
            <h2 className="text-6xl font-bold leading-tight font-sans mt-6 max-w-[400px]">
                Event<span className="text-primary">Hive</span>-ing <br className="hidden sm:block"/> the Best.Day.<br className="hidden sm:block"/> Ever.
            </h2>

            {/* Stats Section */}
            <div className="flex flex-row md:flex-col lg:flex-row justify-center lg:justify-start mt-6 gap-6">
                <div className="bg-primary text-white p-4 rounded-lg w-[148px] h-[125px] text-center">
                    <p className="text-3xl font-bold">2k+</p>
                    <p className="text-md font-semibold mt-2">Total Events Hosted</p>
                </div>
                <div className="bg-primary text-white p-4 rounded-lg w-[148px] h-[125px] text-center">
                    <p className="text-3xl font-bold">100+</p>
                    <p className="text-md font-semibold mt-2">Total Events Live</p>
                </div>
            </div>
        </div>

        {/* Right Side Image */}
        <div className="w-1/2 lg:w-[50%] flex justify-center mt-6 lg:mt-0">
            <img 
                src="/allevtimg.jpg" 
                alt="Event Lights" 
                className="w-[900px] h-[450px] lg:w-[900px] lg:h-[450px] md:w-[700px] md:h-auto sm:w-auto sm:h-[80px] rounded-l-xl object-cover sm:justify-items-left"
            />
        </div>
    </section>



      {/* Upcoming Events Section */}
        <section className="p-8 bg-background flex flex-col items-center mt-10 sm:mt-16">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center md:text-left font-sans">
                <span className="text-primary">Colleges</span> near you
            </h2>

            {/* Filters */}
      <div className="w-full md:w-[460px] h-auto flex flex-col sm:flex-col md:flex-row gap-4 mt-4 md:mt-0">
        <select className="p-2 rounded-md bg-gray-200 text-black text-sm w-full md:w-[140px] h-[40px]">
          <option>Weekdays</option>
        </select>
        <select className="p-2 rounded-md bg-gray-200 text-black text-sm w-full md:w-[140px] h-[40px]">
          <option>Event type</option>
        </select>
        <select className="p-2 rounded-md bg-gray-200 text-black text-sm w-full md:w-[140px] h-[40px]">
          <option>Any category</option>
        </select>
      </div>
        </div>


      {/* Event Grid (2 Rows, 3 Columns) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto px-0">
      {[
        { id: 1, image: "/img2.jpg" },
        { id: 2, image: "/img3.jpg" },
        { id: 3, image: "/img1.jpg" },
        { id: 4, image: "/img1.jpg" },
        { id: 5, image: "/img1.jpg" },
        { id: 6, image: "/img2.jpg" },
        { id: 7, image: "/img2.jpg" },
        { id: 8, image: "/img2.jpg" },
        { id: 9, image: "/img2.jpg" },
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
      <footer className="bg-navy text-white p-12 text-center w-full min-h-[334px] flex flex-col justify-between mt-[150px]">
        {/* Branding */}
        <h2 className="text-[49px] font-bold">
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
          <button className="bg-primary text-white px-6 py-2 w-[150px] h-[50px] rounded-md  sm:w-auto hover:bg-purple-600">
            Subscribe
          </button>
        </div>
      
        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mt-12 text-lg font-sm flex-medium p-0 font-inter">
          <a href="#" className="hover:text-purple-400">Home</a>
          <a href="#" className="hover:text-purple-400">About</a>
          <a href="#" className="hover:text-purple-400">Services</a>
          <a href="#" className="hover:text-purple-400">Get in touch</a>
          <a href="#" className="hover:text-purple-400">FAQs</a>
        </div>
      
        {/* Divider */}
        <hr className="mt-12 border-t border-gray-400 w-4/5 mx-auto" />
      
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

export default AllEvents;
