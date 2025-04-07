import {
  generateAdminReportService,
  generateUserReportService,
} from "../service/report.service.js";

export const getAdminReports = async (req, res) => {
  try {
    const result = await generateAdminReportService(req.body);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserReports = async (req, res) => {
  try {
    const userId = req.user._id;
    const result = await generateUserReportService(userId);
    return res.status(200).json({ data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
