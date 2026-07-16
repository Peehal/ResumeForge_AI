import express from "express";
import { protect } from "../middlewares/authMiddleware.js"
import { enhanceJobDesciption, enhanceprofessionalSummary, uploadResume } from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceprofessionalSummary)
aiRouter.post('/enhance-job-desc', protect, enhanceJobDesciption)
aiRouter.post('/upload-resume', protect, uploadResume)

export default aiRouter