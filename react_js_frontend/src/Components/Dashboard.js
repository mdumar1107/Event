import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const [totalVisitors, setTotalVisitors] = useState(null);
  const [dailyTraffic, setDailyTraffic] = useState(null);
  const [weeklyRevenue, setWeeklyRevenue] = useState(null);
  const [totalEvents, setTotalEvents] = useState(null);
  const [pieChartData, setPieChartData] = useState({ newUsers: 0, returningUsers: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [visitorsRes, trafficRes, revenueRes, eventsRes, pieRes] = await Promise.all([
          axios.get("http://localhost:5000/api/analytics/total-visitors"),
          axios.get("http://localhost:5000/api/analytics/daily-traffic"),
          axios.get("http://localhost:5000/api/analytics/weekly-revenue"),
          axios.get("http://localhost:5000/api/analytics/total-events"),
          axios.get("http://localhost:5000/api/analytics/pie-chart-data")
        ]);

        setTotalVisitors(visitorsRes.data.totalVisitors);
        setDailyTraffic(trafficRes.data.dailyVisitors);
        setWeeklyRevenue(revenueRes.data.weeklyRevenue);
        setTotalEvents(eventsRes.data.totalEvents);
        setPieChartData(pieRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const pieData = [
    { name: "New Users", value: pieChartData.newUsers, color: "#4CAF50" },
    { name: "Returning Users", value: pieChartData.returningUsers, color: "#2196F3" }
  ];

  return (
    <div className="w-full min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-[250px] bg-white flex flex-col items-center shadow-lg">
        <h1 className="text-primary text-center text-[27px] font-bold mt-4 px-6 py-4">Event Hive</h1>
        <nav className="w-full px-6 mt-8">
          <NavLink to="/dashboard" className={({ isActive }) =>`block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>Dashboard</NavLink>
          <NavLink to="/dash-events" className="block px-6 py-4 font-semibold rounded-lg text-black hover:bg-gray-200">Events</NavLink>
          <NavLink to="/dash-messages" className="block px-6 py-4 font-semibold rounded-lg text-black hover:bg-gray-200">Messages</NavLink>
          <NavLink to="/dash-profile" className="block px-6 py-4 font-semibold rounded-lg text-black hover:bg-gray-200">Profile</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[{ label: "Total Visitors", value: totalVisitors },
            { label: "Daily Traffic", value: dailyTraffic },
            { label: "Weekly Revenue", value: weeklyRevenue ? `₹${weeklyRevenue}` : null },
            { label: "Total Events", value: totalEvents }]
            .map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md text-center">
                <h3 className="text-lg font-semibold text-gray-600">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value !== null ? stat.value : "No Data"}</p>
              </div>
            ))}
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white rounded-lg p-6 shadow-md mt-8 flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">User Distribution</h3>
          {pieChartData.newUsers + pieChartData.returningUsers > 0 ? (
            <PieChart width={300} height={300}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : (
            <p className="text-gray-400">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
