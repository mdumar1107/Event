import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema({
  totalVisitors: { type: Number, default: 0 },
  dailyVisitors: { type: Number, default: 0 },
  weeklyRevenue: { type: Number, default: 0 },
  totalEvents: { type: Number, default: 0 },
  newUsers: { type: Number, default: 0 },
  returningUsers: { type: Number, default: 0 },
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

export default Analytics;
