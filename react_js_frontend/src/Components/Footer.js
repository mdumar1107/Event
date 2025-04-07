import React, { useState } from "react";
import axios from "axios";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      setMsg("");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/subscribe", {
        email,
      });

      setMsg("🎉 Thank you for subscribing!");
      setError("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("❌ Subscription failed. Try again later.");
      setMsg("");
    }
  };

  return (
    <footer className="bg-navy text-white p-12 text-center w-full min-h-[334px] flex flex-col justify-between">
      {/* Branding */}
      <h2 className="text-3xl font-bold">
        Event <span className="text-primary">Hive</span>
      </h2>

      {/* Email Subscription Form */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your mail"
          className="p-3 rounded-md w-full sm:w-auto sm:flex-1 outline-none text-black"
        />
        <button
          onClick={handleSubscribe}
          className="bg-primary text-white px-6 py-2 rounded-md w-full sm:w-auto hover:bg-purple-600"
        >
          Subscribe
        </button>
      </div>

      {/* Success/Error Message */}
      <div className="mt-2 text-sm">
        {msg && <p className="text-green-400">{msg}</p>}
        {error && <p className="text-red-400">{error}</p>}
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
  );
};

export default Footer;
