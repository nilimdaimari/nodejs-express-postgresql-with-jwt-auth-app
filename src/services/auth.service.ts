import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/jwt.utils";
import dotenv from "dotenv";
import { User } from "../models/user.model";
import { prisma } from "../configs/prisma.config";

dotenv.config();

export const createUser = async (userData: User) => {
    try {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const rolesList = await prisma.roles.findMany({
            where: {
                name: {
                    in: userData.roles,
                },
            },
        });

        if (rolesList.length === 0) {
            throw new Error("No valid roles found!");
        }

        const roleIds = rolesList.map((role) => role.id);

        const newUser = await prisma.users.create({
            data: {
                email: userData.email,
                password: hashedPassword,
                role: {
                    createMany: {
                        data: roleIds.map((roleId) => ({
                            role_id: roleId,
                        })),
                    },
                },
            },
            include: {
                role: true,
            },
        });

        const { password: _, ...newUserWithoutPassword } = newUser;
        return { newUser: newUserWithoutPassword };
    } catch (error) {
        throw new Error("User creation failed!");
    }
};

export const authenticateUser = async (userInput: User) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email: userInput.email,
            },
        });

        if (
            !user ||
            !(await bcrypt.compare(userInput.password, user.password))
        ) {
            throw new Error("Invalid credentials!");
        }

        const accessToken = generateAccessToken(user);
        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, accessToken };
    } catch (error) {
        throw new Error((error as Error).message);
    }
};
