import express from "express";
import  { 
    getAnalytics,
  afterLogin, 
  afterBooking, 
  getTotalVisitors, 
  getDailyTraffic, 
  getWeeklyRevenue, 
  getTotalEvents, 
  getPieChartData 
} from "../controllers/analyticsController.js"; // ✅ Correct imports

const router = express.Router();

// Route to get all analytics data
router.get("/", getAnalytics); // ✅ Added main analytics route

// Routes for specific analytics data
router.get("/total-visitors", getTotalVisitors);
router.get("/daily-traffic", getDailyTraffic);
router.get("/weekly-revenue", getWeeklyRevenue);
router.get("/total-events", getTotalEvents);
router.get("/pie-chart-data", getPieChartData);

// Trigger analytics update after key actions
router.post("/after-login", afterLogin); // ✅ Added login update route
router.post("/after-booking", afterBooking); // ✅ Added booking update route

export default router;
