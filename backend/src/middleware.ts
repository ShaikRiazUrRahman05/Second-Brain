import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

// Allow adding userId to Express request
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(403).json({ message: "No token provided" });
    }

    // directly verify the token (your original logic)
    const decoded = jwt.verify(header as string, JWT_PASSWORD) as JwtPayload;

    if (decoded && decoded.id) {
      //@ts-ignore
      req.userId = decoded.id;
      next();
    } else {
      res.status(403).json({ message: "You are not logged in" });
    }
  } catch (err) {
    res.status(403).json({
      message: "You are not logged in or token is invalid",
    });
  }
};
