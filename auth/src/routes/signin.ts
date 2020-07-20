import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../utils/password';

import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('E-mail is required'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    //Genarate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY! //sadfgs --> e44346f64b8a1446f4df5119f68a115f
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };
    //console.log('Usuário logado');

    return res
      .status(200)
      .send({ message: 'Done!', existingUser });
  }
);

export { router as signinRouter };
