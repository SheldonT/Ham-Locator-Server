import { Request, Response, Router } from 'express';

export const Routes = (): Router => {
    const router = Router();

    // router.use('/users', users)

    router.get('/', (req: Request, res: Response) => {
        res.send("Request Received")
    })

    return router;
}