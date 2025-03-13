import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-[1000px] bg-background flex flex-col justify-top items-center font-sans px-4 sm:px-0">
      {/* Header */}
      <header className="w-full max-w-[1200px] h-[49px] mx-auto flex justify-between items-center p-0 bg-background mt-6">
        <h1 className="text-3xl font-bold font-sans">
          <Link to="/">
            Event <span className="text-primary">Hive</span>
          </Link>
        </h1>
        <div>
          <button onClick={() => window.location.href='/signin'} className="mr-4 text-black px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">
            Login
          </button>
          <button onClick={() => window.location.href='/signup'} className="bg-primary text-white px-6 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-200">
            Signup
          </button>
        </div>
      </header>

      {/* Create Event Card */}
      <div className="w-full sm:w-[816px] bg-background p-0 flex flex-col items-center mt-12 font-sans">
        <h2 className="text-3xl font-bold text-center mb-6">Registration</h2>
        <form className="w-full">
          <div>
            <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Your name</label>
            <input type="text" placeholder="Enter your name" className="w-full p-3 rounded-sm text-sm " />

            <label className="block font-semibold text-gray-900 text-sm mb-2 mt-6">Your Email</label>
            <input type="text" placeholder="Enter your mail" className="w-full p-3 rounded-sm text-sm " />

            

            
          </div>
        </form>
      </div>

      
    </div>
  );
};

export default Register;