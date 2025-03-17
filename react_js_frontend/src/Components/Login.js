import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const userData = response.data.user; // Assuming response contains user data
      localStorage.setItem("user", JSON.stringify({ name: userData.name, email: userData.email }));

      alert("Login successful!");
      navigate("/"); // Redirect to dashboard or home
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      <div className="w-full max-w-[1440px] min-h-[900px] flex flex-col lg:grid lg:grid-cols-3 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-full lg:col-span-2 flex justify-center items-center bg-background order-2 lg:order-1">
          <div className="w-[90%] max-w-[578px] bg-background flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold text-center mb-6">
              <Link to="/" className="text-black">
                Event <span className="text-primary">Hive</span>
              </Link>
            </h2>
            <h2 className="text-3xl font-bold mb-6 text-center">Sign In to Event Hive</h2>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="w-full flex flex-col">
                <label className="block text-sm font-medium">EMAIL</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-4 border"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="flex justify-between items-center mt-5">
                  <label className="block text-sm font-medium">PASSWORD</label>
                  <span
                    className="text-gray-600 cursor-pointer text-sm"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot your password?
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-[46px] p-3 rounded-lg mt-2 mb-6 border"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div className="flex justify-center">
                  <button type="submit" className="w-[257px] bg-primary text-white p-3 rounded-lg mb-4 hover:bg-purple-500">
                    Sign In
                  </button>
                </div>
              </div>
            </form>
            <div className="text-center text-sm mb-4">Or</div>
            <div className="flex justify-center">
              <button className="w-[317px] h-[46px] flex justify-center items-center gap-2 border p-3 rounded-lg bg-white">
                <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
        <div
          className="w-full lg:col-span-1 flex items-center justify-center bg-cover bg-center relative min-h-[500px] lg:min-h-[900px] order-1 lg:order-2"
          style={{ backgroundImage: "url('/signin.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-2">Hello Friend</h2>
            <p className="text-sm mt-4 mb-4">
              To keep connected with us, provide us with your information.
            </p>
            <button
              onClick={() => window.location.href = '/signup'}
              className="mt-4 bg-white opacity-40 text-black px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;