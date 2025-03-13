import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert(res.data.message);
      navigate("/Login");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-0 py-0 bg-gray-100">
      <div className="w-full max-w-[1400px] max-h-[900px] grid grid-cols-1 md:grid-cols-3 bg-white rounded-lg shadow-lg overflow-hidden px-0 py-0 md:p-0">
        <div
          className="w-full md:col-span-1 flex items-center justify-center bg-cover bg-center relative h-56 md:h-auto"
          style={{ backgroundImage: "url('/signup.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="text-sm mt-4 mb-4">
              To keep connected with us, provide us with your information.
            </p>
            <button
              onClick={() => window.location.href = '/Login'}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-background transition"
            >
              Sign In
            </button>
          </div>
        </div>

        <div className="w-full md:col-span-2 flex justify-center items-center p-6 bg-background overflow-auto">
          <div className="w-[90%] max-w-[578px] min-h-[500px] md:h-[708px] bg-background flex flex-col justify-center p-6">
            <h1 className="text-xl font-bold mb-2 text-center">
              <Link to="/">
                Event <span className="text-primary">Hive</span>
              </Link>
            </h1>
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up to Event Hive</h2>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col">
                <label className="block text-sm font-medium">YOUR NAME</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-4 border"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                
                <label className="block text-sm font-medium mt-5">YOUR EMAIL</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-4 border"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                
                <label className="block text-sm font-medium mt-5">PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-4 border"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                
                <label className="block text-sm font-medium mt-5">CONFIRM PASSWORD</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-6 border"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                
                <div className="flex justify-center">
                  <button type="submit" className="w-[257px] bg-primary text-white p-3 rounded-lg mb-4 hover:bg-purple-500">
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
            
            <div className="text-center text-sm mb-4">Or</div>
            <div className="flex justify-center">
              <button className="w-[317px] h-[46px] flex justify-center items-center gap-2 border p-3 rounded-lg bg-white">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
