import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  //console.log('Deslogando usuário');
  req.session = null;
  //console.log('Usuário deslogando');
  return res.clearCookie('express:sess').send({});
});

export { router as signoutRouter };
