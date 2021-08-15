import { Router } from "express";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserSendComplimentsController } from "./controllers/LIstUserSendComplimentsController";
import { ListUserRecieveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsConstoller =
  new ListUserSendComplimentsController();
const listUserRecieveComplimentsController =
  new ListUserRecieveComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
); // normalmente o recurso se escreve no plural
router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsConstoller.handle
);
router.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserRecieveComplimentsController.handle
);
router.get(
    "/tags",
    ensureAuthenticated,
    listTagsController.handle
  );
router.get(
    "/users",
    ensureAuthenticated,
    listUsersController.handle
  );

export { router };
