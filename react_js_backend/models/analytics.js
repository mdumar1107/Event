import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "analytics" }, // Ensures a single document
    totalVisitors: { type: Number, default: 0 },
    dailyVisitors: { type: Number, default: 0 },
    weeklyRevenue: { type: Number, default: 0 },
    totalEvents: { type: Number, default: 0 },
    newUsers: { type: Number, default: 0 },
    returningUsers: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics; // ✅ Ensure a default export
