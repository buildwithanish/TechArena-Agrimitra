import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  updateUserLastLogin
} from "../repositories/platformRepository.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";

function userPayload(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    language: user.language,
    subscriptionPlan: user.subscriptionPlan,
    farmCount: user.farmCount,
    plan: user.subscriptionPlan,
    farms: user.farmCount,
    isBlocked: Boolean(user.isBlocked),
    status: user.isBlocked ? "blocked" : "active"
  };
}

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, role = "farmer", language = "en" } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email, and password are required");
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role,
    language
  });

  res.status(201).json({
    success: true,
    token: signToken(user),
    user: userPayload(user)
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await findUserByEmail(email, { includePassword: true });
  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked. Please contact the administrator");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  await updateUserLastLogin(user._id);

  res.json({
    success: true,
    token: signToken(user),
    user: userPayload(user)
  });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    user: userPayload(req.user)
  });
});

export { userPayload };
