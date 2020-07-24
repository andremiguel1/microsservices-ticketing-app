import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const createTicket = (cookie?: string[]) => {
  const title = 'asdfasdf';
  const price = 20;

  return request(app)
    .post('/api/tickets')
    .set('Cookie', !cookie ? global.signin() : cookie)
    .send({ title, price });
};

it('returns a 401 if the provided id does not exists', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sawefsaf',
      price: 20,
    })
    .expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'sawefsaf',
      price: 20,
    })
    .expect(401);
});

it('returns a 401 if the user does not not own the ticket', async () => {
  //Create a ticket
  const response = await createTicket();
  const id = response.body.id;
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'sawefsaf',
      price: 2000,
    })
    .expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const cookie: string[] = global.signin();
  const responseTicket = await createTicket(cookie);
  const id = responseTicket.body.id;
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      price: 20,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title: 'awefasdfdsf',
      price: -20,
    })
    .expect(400);
});

it('updates the ticket provided with valid inputs', async () => {
  const cookie: string[] = global.signin();
  const responseTicket = await createTicket(cookie);
  const id = responseTicket.body.id;

  const title = 'TEXTO ATUALIZADO';
  const price = 2512;

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price,
    })
    .expect(200);
  
  const response = await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', cookie)
  .expect(200);

  expect(response.body.title).toEqual(title);
  expect(response.body.price).toEqual(price);
});
