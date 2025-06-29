import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import CustomError from "../utils/CustomError.ts";
interface JwtPayload {
  email: string;
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(new CustomError("Unauthorized", 401));
  }

  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next(new CustomError("Unauthorized", 401));
  }

  jwt.verify(token, "saleem", async (err, decoded) => {
    if (err) {
      next(new CustomError(err.message, 401));
    }
    const user = decoded as JwtPayload;
    req.user = user;

    next();
  });
};
