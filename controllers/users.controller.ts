import { Request, Response, Router } from "express"

export const UsersController = (): Router => {
    const routes = Router();

    routes.get('/', (req: Request, res: Response) => {
        res.send("response message")
    })

    return routes;
}