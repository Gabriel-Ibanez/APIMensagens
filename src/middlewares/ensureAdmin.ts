import { Request, Response, NextFunction } from "express"
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {


    const { user_id } = request;
    console.log(`O usuário é ${user_id}`)

    const userRepositories = getCustomRepository(UsersRepositories)

    const user = await userRepositories.findOne(user_id)
    const admin = user.admin;

    if (admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized!",
    });
}