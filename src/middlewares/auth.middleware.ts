import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET_KEY } from "../configs/jwtSecret.config";

dotenv.config();

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid authorization header!" });
    }

    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
        return res.status(401).json({
            success: false,
            message: "Authorization accessToken not found!",
        });
    }

    try {
        const decoded = jwt.verify(accessToken, JWT_SECRET_KEY);

        (req as any).user = decoded as JwtPayload;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid token!" });
    }
};
