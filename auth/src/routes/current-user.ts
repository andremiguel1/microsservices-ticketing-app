import express, { Request, Response } from 'express';
import { currentUserHandler } from '../middlewares/current-user-handler';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUserHandler,
  (req: Request, res: Response) => {
    res.send({
      currentUser: req.currentUser || null,
    });
  }
);

export { router as currentUserRouter };
