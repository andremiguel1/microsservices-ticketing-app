import request from 'supertest';
import { app } from '../../app';

const createTicket = () => {
  const title = 'asdfasdf';
  const price = 20;

  return request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title, price });
};

it('can fetch a list of tickets', async () => {
  for (let i = 0; i < 3; i++) {
    await createTicket();
  }

  const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);
  expect(response.body.length).toEqual(3);
});
