import express from "express";
import { getTotalVisitors, getDailyTraffic, getWeeklyRevenue, getTotalEvents, getPieChartData } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/total-visitors", getTotalVisitors);
router.get("/daily-traffic", getDailyTraffic);
router.get("/weekly-revenue", getWeeklyRevenue);
router.get("/total-events", getTotalEvents);
router.get("/pie-chart-data", getPieChartData);

export default router;
