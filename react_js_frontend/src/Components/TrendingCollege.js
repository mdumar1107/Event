import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const TrendingCollege = () => {
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
      <div className="w-full flex justify-center items-center mt-6">
        <section 
          className="w-[1320px] h-[596px] bg-cover bg-center flex justify-center items-center text-white text-4xl font-bold rounded-2xl"
          style={{ backgroundImage: "url('/trndclg.jpg')" }}
        >
          
        </section>
      </div>

      {/* College Event Card Section */}
      <div className="w-full flex justify-center items-center mt-6 mb-10 sm:mb-16">
        <div className="w-[1200px]  bg-background  px-0 font-sans">
          <h2 className="text-3xl font-bold mb-4">IIT Roorke</h2>
          <p className="text-gray-500 mb-2 text-sm mt-6">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 mb-2 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 mb-2 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
          <p className="text-gray-500 text-sm">
            DesignHub organized a 3D Modeling Workshop using Blender on 16th February at 5 PM. 
            The workshop taught participants the magic of creating stunning 3D models and animations using Blender. 
            It was suitable for both beginners and experienced users. The event was followed by a blender-render competition, 
            which added to the excitement.
          </p>
        </div>
      </div>

      {/* Upcoming Events Section */}
        <section className="p-8 bg-background flex flex-col items-center mt-10 sm:mt-16">
            <div className="max-w-[1200px] w-full mx-auto flex flex-col sm:flex-col md:flex-row justify-between items-center mb-6 px-0">
            {/* Title */}
            <h2 className="text-3xl font-bold text-center md:text-left">
                College <span className="text-primary">Events</span>
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

export default TrendingCollege;
