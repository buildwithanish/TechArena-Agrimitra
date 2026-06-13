import { Router } from "express";
import { profile, updateProfile } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validate.js";
import { supportedLanguageCodes } from "../config/languages.js";

const router = Router();

router.get("/profile", profile);
router.put(
  "/profile",
  validateRequest({
    body: {
      language: {
        enum: supportedLanguageCodes,
        message: `Language must be one of ${supportedLanguageCodes.join(", ")}`
      }
    }
  }),
  updateProfile
);

export default router;
