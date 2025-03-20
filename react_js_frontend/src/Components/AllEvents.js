import React from "react";
import { Link } from "react-router-dom";
import {  FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const AllEvents = () => {
  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
      <div>
        <Header /> 
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
      <div>
        <Footer />
      </div>

      </div>
  );
};

export default AllEvents;
