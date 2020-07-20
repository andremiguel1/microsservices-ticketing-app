import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email deve ser válido'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password deve ter entre 4 e 20 caracteres'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    //console.log('Criando usuário.');

    const { email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      //console.log('Email em uso');
      throw new BadRequestError('Email em uso');
    }

    const user = User.build({ email, password });
    await user.save();

    //Genarate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! //sadfgs --> e44346f64b8a1446f4df5119f68a115f
    );

    //Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({ message: 'Done!', user });
    //console.log(`Usuario ${user.email} criado com sucesso`);
  }
);

export { router as signupRouter };
