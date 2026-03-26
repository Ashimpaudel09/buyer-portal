import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthenticatedRequest extends Request {
  user?: { userId: number };
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ error: "Unathorized" });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
