import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequets {
    email: string,
    password: string,
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequets) {

        const usersRepositories = getCustomRepository(UsersRepositories)
        
        // verificar se email existe
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect!");
        }

        // verificar se senha está correta
        const isPasswordCorrect = await compare(password, user.password) 
        if (!isPasswordCorrect) {
            throw new Error("Email/Password incorrect!");
        }

        // gerar token

        const token = sign({
            email: user.email
        },"47d7a1d06803aa56467a711a51a97ad3", {  // md5 OláGabriel
            subject: user.id,
            expiresIn: "1d" // 1 day
        });

        return token;

    }
}

export { AuthenticateUserService}