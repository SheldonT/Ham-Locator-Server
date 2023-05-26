/** @format */

import { Request, Response, Router } from "express";
import UserService from "../services/users.service";
import { UserData } from "../models/user.model";

export default class UsersController {
  public routes = Router();
  public service;

  constructor(dbConn: any) {
    this.service = new UserService(dbConn);

    this.routes.post("/", async (req: Request, res: Response) => {
      const username: string = req.body.username;
      const passwd: string = req.body.passwd;

      const authUser = await this.service
        .authUser(username, passwd)
        .catch((e) => console.log(e));

      if (authUser !== "-1") {
        req.session.user = authUser;
        req.session.loggedIn = true;
        //res.set("Set-Cookie", `hlSession=${req.sessionID}; Path=/; HttpOnly;`);
        console.log("Setting cookie");
        res.cookie("hlSession", req.sessionID, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          path: "/",
          httpOnly: true,
        });
        res.send(req.sessionID);
      } else {
        req.session.loggedIn = false;
        res.send("-1");
      }
    });

    this.routes.get("/session", async (req: Request, res: Response) => {
      let validSession: any = false;

      if (req.cookies.hlSession) {
        validSession = await this.service
          .sessionUser(req.cookies.hlSession)
          .catch((e) => console.log(e));
        if (validSession === true) {
          res.send(req.cookies.hlSession);
        } else {
          res.send("-1");
        }
      } else {
        res.send("-1");
      }
    });

    this.routes.get("/getuser", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      const userId = await this.service
        .fetchUserId(id)
        .catch((e) => console.log(e));

      const resp = await this.service
        .getUser(userId)
        .catch((e) => console.log(e));

      res.send(resp);
    });

    this.routes.post("/adduser", async (req: Request, res: Response) => {
      const newUser: UserData = req.body;

      if (Object.keys(newUser).length === 0) {
        console.log("No user data found");
        res.send("No user data found.");
      } else {
        const resp = await this.service
          .addUser(newUser)
          .catch((e) => console.log(e));
        res.send(resp);
      }
    });

    this.routes.post("/edituser", async (req: Request, res: Response) => {
      const newUserData: any = req.body;
      //const userId: string = req.body.userId;

      const userId: string = await this.service
        .fetchUserId(req.body.userId)
        .catch((e) => console.log(e));

      const resp = this.service
        .editUser(newUserData, userId)
        .catch((e) => console.log(e));
      res.send(resp);
    });

    this.routes.get("/logout", async (req: Request, res: Response) => {
      const sessionId: any = req.query.sessionId;

      const isLoggedOut = await this.service
        .logout(sessionId)
        .catch((e) => console.log(e));

      res.send(isLoggedOut);
    });
  }
}
