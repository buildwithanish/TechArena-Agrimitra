import { asyncHandler } from "../utils/asyncHandler.js";
import { getAdminDashboardData, getFarmerDashboardData } from "../services/dashboardService.js";
import { localizeValue } from "../services/localizationService.js";
import { normalizeLanguage } from "../config/languages.js";

export const farmerDashboard = asyncHandler(async (req, res) => {
  const language = normalizeLanguage(req.user?.language);
  const data = localizeValue(await getFarmerDashboardData(req.user._id), language);
  res.json({ success: true, data, meta: { language } });
});

export const adminDashboard = asyncHandler(async (req, res) => {
  const data = await getAdminDashboardData();
  res.json({ success: true, data });
});
