import { Request, Response } from "express";
import { ListUserRecieveComplimentsService } from "../service/ListUserRecieveComplimentsService";

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSendComplimentsService =
      new ListUserRecieveComplimentsService();

    const compliments = await listUserSendComplimentsService.execute(user_id);

    return response.json(compliments);
  }
}

export { ListUserSendComplimentsController };
