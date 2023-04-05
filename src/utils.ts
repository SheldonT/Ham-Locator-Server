export const isAuthenticated = (req: Request, res: Response) =>{
    if (req.cookies?.user) {
      return true;
    } else {
        return false
    }
  }