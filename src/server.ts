import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
    })
  }
);

app.listen(3000, () => console.log("Server is running now"));

// app.get("/test/idParam", (request, response) => {
//     // requeste => entrando
//     // response => saindo
//     return response.send("Retoro do método GET")
// })

// app.post("/test-post", (request, response)=> {
//    return response.send("Retorno do método POST")
// })
// // http://localhost:3000
