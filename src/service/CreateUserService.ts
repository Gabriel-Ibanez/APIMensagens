// Nesta classe colocamos tudo o que é relacionado à criação de usuário
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  // I de interface
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin = false, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
        throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash, // queremos colocar um valor que é diferente
    });

    await usersRepository.save(user);
    return user;
  }
}

export { CreateUserService };
