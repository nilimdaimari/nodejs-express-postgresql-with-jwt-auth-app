import { Request, Response } from "express";
import * as authService from "../services/auth.service";
import { User } from "../models/user.model";
import { prisma } from "../configs/prisma.config";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const userData: User = req.body;

        const existingUser = await prisma.users.findUnique({
            where: {
                email: userData.email,
            },
        });

        if (existingUser) {
            throw new Error("Email is already in use!");
        }

        if (!userData.email || !userData.password || !userData.roles) {
            return res
                .status(400)
                .json({ error: "Email, password, and roles are required" });
        }

        const newUser = await authService.createUser(userData);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const userInput: User = req.body;
        const { user, accessToken } = await authService.authenticateUser(
            userInput
        );

        res.json({ user, accessToken });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};
