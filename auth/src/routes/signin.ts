import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('E-mail is required'),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    console.log('Logando usuario');

    return res.status(201).send({});
  }
);

export { router as signinRouter };
