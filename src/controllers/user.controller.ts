import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { User } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await userService.readAllUsers();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);

        const user = await userService.readUserById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const userData: Partial<User> = req.body;

        const updatedUser = await userService.updateUser(userId, userData);
        if (!updatedUser) {
            res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};

export const deleteUserUser = async (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id, 10);
        const deletedUser = await userService.deleteUser(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error!",
        });
    }
};
