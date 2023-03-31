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
        res.set(
          "Set-Cookie",
          `connect.sid=${req.sessionID}; Path=/; HttpOnly;`
        );
      } else {
        req.session.loggedIn = false;
      }

      //res.set("Set-Cookie", `connect.sid=${req.sessionID}; Path=/; HttpOnly`);

      res.send(authUser);
    });

    this.routes.get("/getuser", async (req: Request, res: Response) => {
      const id: any = req.query.id;

      const resp = await this.service.getUser(id).catch((e) => console.log(e));

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
      const userId: string = req.body.userId;

      const resp = this.service
        .editUser(newUserData, userId)
        .catch((e) => console.log(e));
      res.send(resp);
    });

    // Add more routes inside the constructor
  }
}

/*const authUserId = await this.service
        .authUser(username, passwd)
        .catch((e) => console.log(e));
      console.log(req.sessionID);
      console.log(req.session);
      req.session.regenerate(function (err) {
        if (err) res.send(err);
        // store user information in session, typically a user id
        //console.log(req.session);

        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return res.send(err);
          res.redirect("/");
        });
      });*/
