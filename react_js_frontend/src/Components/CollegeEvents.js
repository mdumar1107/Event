import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const CollegeEvents = () => {
  return (
    <div className="font-sans bg-background">
      {/* Header Section */}
      <div>
        <Header /> 
      </div>

      {/* Hero Section */}
<div className="w-full flex justify-center items-center mt-20">
  <section 
    className="w-[1044px] h-[78px] bg-cover bg-center flex justify-center items-center text-white text-4xl font-bold px-0"
    style={{ backgroundImage: "url('/mnt/data/image.png')" }}
  >
    <h1 className="text-black font-bold text-6xl">
      Checkout your <span className="text-primary">college events</span> now!!
    </h1>
  </section>
</div>

{/* College Event Card Section */}
<div className="w-full flex justify-center items-center mt-[50px] mb-10 sm:mb-16 overflow-hidden">
  <div className="w-full max-w-[1746px] h-auto sm:h-[299px] bg-background px-0 font-sans flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 overflow-hidden">
    {/* Left Image (Vertically Centered, Rounded on Right Side) */}
    <div className="w-[90%] sm:w-[570px] h-[207px] overflow-hidden flex justify-center items-center">
      <img src="/clgevt1.jpg" alt="College Event" className="w-full sm:w-[570px] h-[207px] object-cover rounded-r-[20px] shadow-lg" />
    </div>
    
    {/* Center Image (Fully Visible) */}
    <img src="/clgevt2.jpg" alt="College Event" className="w-[90%] sm:w-[570px] h-[299px] rounded-[20px]" />
    
    {/* Right Image (Vertically Centered, Rounded on Left Side) */}
    <div className="w-[90%] sm:w-[570px] h-[207px] overflow-hidden flex justify-center items-center">
      <img src="/clgevt3.jpg" alt="College Event" className="w-full sm:w-[570px] h-[207px] object-cover rounded-l-[20px] shadow-lg" />
    </div>
  </div>
</div>





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
      <div>
        <Footer />
      </div>

      </div>
  );
};

export default CollegeEvents;
