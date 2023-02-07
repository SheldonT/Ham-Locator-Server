import { Request, Response, Router } from "express"

export const UsersController = () => {
    const routes = Router();

    routes.get('/', (req: Request, res: Response) => {
        res.send("response message")
    })

    return routes;
}