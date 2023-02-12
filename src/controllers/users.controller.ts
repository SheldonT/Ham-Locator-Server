import { Request, Response, Router } from "express"
import UserService from "../services/users.service";

export default class UsersController{
    public routes = Router();
    public service = new UserService();

    constructor(){
        this.routes.get('/', (req: Request, res: Response) => {
            res.send("response message")
        });

        this.routes.get('/:id', async (req: Request, res: Response) => {
            const id = req.params.id;
            const resp = await this.service.getUser(id)
            res.send(resp)
        });

        // Add more routes inside the constructor
    }
}