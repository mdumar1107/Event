import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Error = () => {
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

    {/* Error Content Section */}
    <main className="flex flex-col items-center text-center py-16 px-4 font-sans">
        <img src="/error.png" alt="404 Illustration" className=" mt-12 lg:max-w-[722px] lg:max-h-[392px] max-w-xs sm:max-w-md md:max-w-lg" />
        <h2 className="text-[44px] font-bold mt-16">Oops!</h2>
        <p className="text-gray-400 text-[24px] mt-8">We can’t seem to find the page you are looking for</p>
        <Link to="/" className="mt-24 w-[206px] h-[45px] px-0 py-2 bg-primary text-white text-[18px] rounded-[50px] font-bold hover:bg-purple-600 font-sans">
          Back to Homepage
        </Link>
        <p className="mt-24 text-black text-[18px]">Follow us on</p>
        <div className="flex gap-4 mt-6">
        <div className="w-[65px] h-[65px] flex items-center justify-center bg-purple-100 rounded-xl">
            <FaInstagram className="text-primary text-[35px]" />
        </div>
        <div className="w-[65px] h-[65px] flex items-center justify-center bg-purple-100 rounded-xl">
            <FaFacebook className="text-primary text-[35px]" />
        </div>
        <div className="w-[65px] h-[65px] flex items-center justify-center bg-purple-100 rounded-xl">
            <FaLinkedin className="text-primary text-[35px]" />
        </div>
        <div className="w-[65px] h-[65px] flex items-center justify-center bg-purple-100 rounded-xl">
            <FaTwitter className="text-primary text-[35px]" />
        </div>
        <div className="w-[65px] h-[65px] flex items-center justify-center bg-purple-100 rounded-xl">
            <FaYoutube className="text-primary text-[35px]" />
        </div>
        </div>

      </main>

      {/* Footer Section */}
      <footer className="bg-navy text-white p-12 text-center w-full min-h-[334px] mt-[50px] flex flex-col justify-between">
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

      
        {/* Divider */}
        <hr className="mt-24 border-t border-gray-400 w-4/5 mx-auto" />
      
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

export default Error;
