import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage'; // Import the HomePage component
import Login from './Components/Login'; // Import the Signin component
import Signup from './Components/Signup'; // Import the Signup component
import CreateEvents from './Components/CreateEvents'; // Import the CreateEvents component
import TrendingCollege from './Components/TrendingCollege'; // Import the HomePage component
import Event from './Components/Event'; // Import the Event component
import CollegeEvents from './Components/CollegeEvents'; // Import the CollegeEvents component
import AllEvents from './Components/AllEvents'; // Import the AllEcents component
import Register from './Components/Register'; // Import the Register component
import Error from './Components/Error'; // Import the Error component
import Dashboard from './Components/Dashboard'; // Import the Dashboard component
import DashMessages from './Components/DashMessages'; // Import the Dashboard Messages component
import DashProfile from './Components/DashProfile'; // Import the Dashboard profile component
import DashEvents from './Components/DashEvents'; // Import the Dashboard component
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from   './Components/ResetPassword';

import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-events" element={<CreateEvents />} />
        <Route path="/trendingcollege" element={<TrendingCollege />} />
        <Route path="/event" element={<Event />} />
        <Route path="/college-events" element={<CollegeEvents />} />
        <Route path="/all-events" element={<AllEvents />} />
        <Route path="/register" element={<Register />} />
        <Route path="/error" element={<Error />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dash-messages" element={<DashMessages />} />
        <Route path="/dash-profile" element={<DashProfile />} />
        <Route path="/dash-events" element={<DashEvents />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();