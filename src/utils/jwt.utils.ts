import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/jwtSecret.config";

export const generateAccessToken = (user: JwtPayload) => {
    try {
        const accessToken = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET_KEY,
            {
                expiresIn: "1h",
            }
        );

        return accessToken;
    } catch (error) {
        throw new Error("Token generation failed!");
    }
};
