import express from "express";
import jwt from "jsonwebtoken";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../validation/authvalidation";
import { users } from "../db/index";
import type { User } from "../types";
import { hashPassword, comparePassword } from "../utils/hash";
import { AuthenticatedRequest, authenticateToken } from "../middleware/auth";

const router = express.Router();

//Register
router.post("/register", validate(registerSchema), async (req, res) => {
  const { name, email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const hashedpassword = await hashPassword(password);
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password: hashedpassword,
    role: "buyer",
  };
  users.push(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", userId: newUser.id });
});

//Login
router.post("/login", validate(loginSchema), async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    return res.status(400).json({ error: "Email is not registered yet" });
  }
  if (!user || !(await comparePassword(password, user.password))) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "Logged in",
    name: user.name,
    role: user.role,
    userId: user.id,
  });
});

//Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

//get me
router.get("/me", authenticateToken, (req:AuthenticatedRequest, res) => {
  const user = users.find((u) => u.id === req.user!.userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});
export default router;
