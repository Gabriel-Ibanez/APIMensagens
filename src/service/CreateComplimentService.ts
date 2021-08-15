// Nesta classe colocamos tudo o que é relacionado à criação de usuário
import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { hash } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepository = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new Error("Incorrect User receiver!");
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) throw new Error("User Receiver doesn't exist!");

    const compliment = complimentsRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message,
    });

    await complimentsRepository.save(compliment);
    return compliment;
  }
}

export { CreateComplimentService };
