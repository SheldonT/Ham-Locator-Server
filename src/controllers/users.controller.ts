/** @format */

import { Request, Response, Router } from "express";
import UserService from "../services/users.service";
import { User } from "../models/user.model";

export default class UsersController {
  public routes = Router();
  public service;

  constructor(dbConn: any) {
    this.service = new UserService(dbConn);

    this.routes.get("/", async (req: Request, res: Response) => {
      const username: any = req.query.username;
      const passwd: any = req.query.passwd;

      const authUserId = await this.service
        .authUser(username, passwd)
        .catch((e) => console.log(e));
      res.send(authUserId);
    });

    this.routes.get("/getuser", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      const resp = await this.service.getUser(id).catch((e) => console.log(e));

      res.send(resp);
    });

    this.routes.post("/adduser", async (req: Request, res: Response) => {
      const newUser: User = req.body;

      if (Object.keys(newUser).length === 0) {
        console.log("No user data found");
        res.send("No user data found.");
      } else {
        const resp = await this.service.addUser(newUser);
        res.send(resp);
      }
    });

    this.routes.post("/edituser", async (req: Request, res: Response) => {
      const newUserData: any = req.body;
      const userId: number = req.body.userId;

      const resp = this.service
        .editUser(newUserData, userId)
        .catch(() =>
          console.log(
            `[server]: User with id ${userId} is not authenticated, or doesn't exist`
          )
        );
      res.send(resp);
    });

    // Add more routes inside the constructor
  }
}
