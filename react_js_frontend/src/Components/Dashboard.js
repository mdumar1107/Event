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
          axios.get("http://localhost:5000/api/analytics/pie-chart")
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
    <div className="w-[1440px] h-[1150px] flex bg-gray-100 p-0">
      {/* Sidebar */}
      <div className="w-[250px] h-[1150px] bg-white flex flex-col items-center px-0 py-0 shadow-lg">
        <h1 className="text-primary text-center text-[27px] font-bold mt-4 px-6 py-4">Event Hive</h1>
        <nav className="w-full px-6 mt-8">
          <NavLink to="/dashboard" className={({ isActive }) => `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>Dashboard</NavLink>
          <NavLink to="/dash-events" className={({ isActive }) => `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>Events</NavLink>
          <NavLink to="/dash-messages" className={({ isActive }) => `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>Messages</NavLink>
          <NavLink to="/dash-profile" className={({ isActive }) => `block px-6 py-4 font-semibold rounded-lg ${isActive ? "bg-primary text-white" : "text-black hover:bg-gray-200"}`}>Profile</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-[1190px] flex flex-col px-0 py-0">
        <div className="w-[1190px] h-[100px] bg-white"></div>
        <div className="flex flex-col items-center py-[20px]">
          <div className="w-[1130px] h-[984px] bg-background mt-4 px-0 py-0 justify-center items-center">
            {/* Row 1: Four Cards */}
            <div className="grid grid-cols-4 gap-[43px] h-[214px]">
              <div className="bg-white h-full rounded-lg flex justify-center items-center shadow-md">
                <h2 className={`text-xl font-bold ${totalVisitors !== null ? "text-black" : "text-gray-400"}`}>
                  {totalVisitors !== null ? totalVisitors : "No Data"} Visitors
                </h2>
              </div>
              <div className="bg-white h-full rounded-lg flex justify-center items-center shadow-md">
                <h2 className={`text-xl font-bold ${dailyTraffic !== null ? "text-black" : "text-gray-400"}`}>
                  {dailyTraffic !== null ? dailyTraffic : "No Data"} Daily Traffic
                </h2>
              </div>
              <div className="bg-white h-full rounded-lg flex justify-center items-center shadow-md">
                <h2 className={`text-xl font-bold ${weeklyRevenue !== null ? "text-black" : "text-gray-400"}`}>
                  ₹{weeklyRevenue !== null ? weeklyRevenue : "No Data"} Weekly Revenue
                </h2>
              </div>
              <div className="bg-white h-full rounded-lg flex justify-center items-center shadow-md">
                <h2 className={`text-xl font-bold ${totalEvents !== null ? "text-black" : "text-gray-400"}`}>
                  {totalEvents !== null ? totalEvents : "No Data"} Events
                </h2>
              </div>
            </div>

            {/* Pie Chart Section */}
            <div className="h-[345px] bg-white mt-8 rounded-lg shadow-md p-4 flex flex-col items-center">
              <h2 className="text-[24px] font-semibold">User Distribution</h2>
              {pieChartData.newUsers + pieChartData.returningUsers > 0 ? (
                <PieChart width={300} height={300}>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              ) : (
                <p className="mt-4 text-gray-400">No data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
