/** @format */

import { Request, Response, Router } from "express";
import UserService from "../services/users.service";
import { User } from "../models/user.model";

export default class UsersController {
  public routes = Router();
  public service;
  public authUserId: string = "-1";

  constructor(dbConn: any) {
    this.service = new UserService(dbConn);

    this.routes.post("/", async (req: Request, res: Response) => {
      const un: any = req.body.username;
      const pw: any = req.body.passwd;

      this.authUserId = await this.service.authUser(un, pw);
      res.send(this.authUserId);
    });

    this.routes.get("/getuser", async (req: Request, res: Response) => {
      const id: any = req.query.id;
      const resp = await this.service.getUser(id);

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

    // Add more routes inside the constructor
  }
}
