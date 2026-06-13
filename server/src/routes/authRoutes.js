import { Router } from "express";
import { login, me, signup } from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
import { validateRequest } from "../middleware/validate.js";
import { supportedLanguageCodes } from "../config/languages.js";

const router = Router();

router.post(
  "/signup",
  validateRequest({
    body: {
      name: { required: true, minLength: 2, message: "Name is required" },
      email: { required: true, type: "email", message: "Valid email is required" },
      password: { required: true, minLength: 8, message: "Password must be at least 8 characters" },
      role: { enum: ["admin", "farmer"], message: "Role must be admin or farmer" },
      language: {
        enum: supportedLanguageCodes,
        message: `Language must be one of ${supportedLanguageCodes.join(", ")}`
      }
    }
  }),
  signup
);
router.post(
  "/login",
  validateRequest({
    body: {
      email: { required: true, type: "email", message: "Valid email is required" },
      password: { required: true, minLength: 8, message: "Password is required" }
    }
  }),
  login
);
router.get("/me", protect, me);

export default router;
