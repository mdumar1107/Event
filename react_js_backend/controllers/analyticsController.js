import User from "../models/user.js";
import Booking from "../models/booking.js";
import Event from "../models/event.js";
import Analytics from "../models/analytics.js"; // Ensure proper import

// Function to update analytics in the database
const updateAnalytics = async () => {
  try {
    const totalVisitors = await User.countDocuments();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dailyVisitors = await User.countDocuments({ lastLogin: { $gte: today } });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const weeklyBookings = await Booking.find({ createdAt: { $gte: oneWeekAgo } });
    const weeklyRevenue = weeklyBookings.reduce((total, booking) => total + booking.numTickets * 250, 0);

    const totalEvents = await Event.countDocuments();
    const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const returningUsers = await User.countDocuments({ createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });

    // Ensure a single analytics document exists
    const analytics = await Analytics.findByIdAndUpdate(
      "analytics", // Fixed ID to enforce a single document
      {
        totalVisitors,
        dailyVisitors,
        weeklyRevenue,
        totalEvents,
        newUsers,
        returningUsers,
      },
      { upsert: true, new: true }
    );

    console.log("✅ Analytics updated successfully:", analytics);
  } catch (err) {
    console.error("❌ Error updating analytics:", err);
  }
};

// API endpoint to get analytics (with automatic update)
export const getAnalytics = async (req, res) => {
  try {
    await updateAnalytics(); // Ensure fresh data
    const analytics = await Analytics.findById("analytics");

    if (!analytics) {
      return res.status(404).json({ message: "No analytics data found" });
    }

    res.json(analytics);
  } catch (err) {
    console.error("❌ Error fetching analytics data:", err);
    res.status(500).json({ error: "Error fetching analytics data" });
  }
};

// Update analytics after login
export const afterLogin = async (req, res) => {
  try {
    await updateAnalytics();
    res.json({ message: "✅ Analytics updated after login" });
  } catch (error) {
    console.error("❌ Error in afterLogin:", error);
    res.status(500).json({ error: "Failed to update analytics after login" });
  }
};

// Update analytics after booking
export const afterBooking = async (req, res) => {
  try {
    await updateAnalytics();
    res.json({ message: "✅ Analytics updated after booking" });
  } catch (error) {
    console.error("❌ Error in afterBooking:", error);
    res.status(500).json({ error: "Failed to update analytics after booking" });
  }
};

// Get total visitors
export const getTotalVisitors = async (req, res) => {
  try {
    const totalVisitors = await User.countDocuments();
    res.json({ totalVisitors });
  } catch (err) {
    console.error("❌ Error fetching total visitors:", err);
    res.status(500).json({ error: "Error fetching total visitors" });
  }
};

// Get daily visitors (traffic)
export const getDailyTraffic = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dailyVisitors = await User.countDocuments({ lastLogin: { $gte: today } });
    res.json({ dailyVisitors });
  } catch (err) {
    console.error("❌ Error fetching daily traffic:", err);
    res.status(500).json({ error: "Error fetching daily traffic" });
  }
};

// Get weekly revenue
export const getWeeklyRevenue = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklyBookings = await Booking.find({ createdAt: { $gte: oneWeekAgo } });
    const weeklyRevenue = weeklyBookings.reduce((total, booking) => total + booking.numTickets * 250, 0);
    res.json({ weeklyRevenue });
  } catch (err) {
    console.error("❌ Error fetching weekly revenue:", err);
    res.status(500).json({ error: "Error fetching weekly revenue" });
  }
};

// Get total events
export const getTotalEvents = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    res.json({ totalEvents });
  } catch (err) {
    console.error("❌ Error fetching total events:", err);
    res.status(500).json({ error: "Error fetching total events" });
  }
};

// Get pie chart data (New vs Returning Users)
export const getPieChartData = async (req, res) => {
  try {
    const newUsers = await User.countDocuments({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
    const returningUsers = await User.countDocuments({ createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });

    res.json({ newUsers: newUsers || 0, returningUsers: returningUsers || 0 });
  } catch (err) {
    console.error("❌ Error fetching pie chart data:", err);
    res.status(500).json({ error: "Error fetching pie chart data" });
  }
};
