import { Request, Response, Router } from 'express';
import UsersController from './users.controller';

export const Routes = (): Router => {
    const router = Router();

    router.use('/users', new UsersController().routes);

    router.get('/', (req: Request, res: Response) => {
        res.send("Base Route Found")
    })
    
    return router;
}