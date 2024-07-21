import { prisma } from "../configs/prisma.config";
import { User } from "../models/user.model";

export const readAllUsers = async () => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                created_at: true,
                updated_at: true,
                role: {
                    select: {
                        roleid: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        return users;
    } catch (error) {
        throw new Error("Internal server error");
    }
};

export const readUserById = async (id: number) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                username: true,
                email: true,
                phone: true,
                created_at: true,
                updated_at: true,
                role: {
                    select: {
                        roleid: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        return user;
    } catch (error) {
        throw new Error("Internal server error");
    }
};

export const updateUser = async (userId: number, userData: Partial<User>) => {
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                username: userData.username,
                email: userData.email,
                phone: userData.phone,
            },
        });
        return updatedUser;
    } catch (error) {
        throw new Error("Internal server error");
    }
};

export const deleteUser = async (userId: number) => {
    try {
        const deletedUser = await prisma.users.delete({
            where: {
                id: userId,
            },
        });
        return deletedUser;
    } catch (error) {
        throw new Error("Internal server error");
    }
};
