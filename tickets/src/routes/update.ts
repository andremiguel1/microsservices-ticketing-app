import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/tickets';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
  validateRequest,
} from '@acmtickets/common';
import { request } from 'http';

const router = express.Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title')
      .not()
      .isEmpty()
      .withMessage('Title is required'),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price is required')
      .isFloat({
        gt: 0,
      })
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    const { title, price } = req.body;

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.send(ticket);

    // const update = await Ticket.findByIdAndUpdate(
    //   id,
    //   req.body,
    //   (err, raw) => {
    //     if (err) {
    //       throw new Error('Error updating ticket');
    //     }
    //     res.send(raw);
    //   }
    // );
  }
);

export { router as updateTicketRouter };
