import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log('Criando usuário.');

    const { email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (existinguser) {
      console.log('Email em uso');
      throw new BadRequestError('Email em uso');
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send({ message: 'Done!', user });
    console.log(`Usuario ${user.email} criado com sucesso`);
  }
);

export { router as signupRouter };
