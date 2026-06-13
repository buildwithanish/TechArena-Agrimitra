import mongoose from "mongoose";
import { supportedLanguageCodes } from "../config/languages.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["admin", "farmer"],
      default: "farmer"
    },
    language: {
      type: String,
      enum: supportedLanguageCodes,
      default: "en"
    },
    subscriptionPlan: {
      type: String,
      default: "starter"
    },
    farmCount: {
      type: Number,
      default: 1
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    blockedAt: Date,
    lastLogin: Date
  },
  {
    timestamps: true
  }
);

export const User = mongoose.model("User", userSchema);
