/** @format */

import "express-session";

declare module "express-session" {
  interface SessionData {
    loggedIn: boolean;
    user: string;
  }
}
