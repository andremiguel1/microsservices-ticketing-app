import express, { Request, Response } from 'express';
import { currentUserHandler } from '@acmtickets/common';

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
