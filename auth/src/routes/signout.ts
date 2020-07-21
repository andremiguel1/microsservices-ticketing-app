import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  //console.log('Deslogando usuário');
  req.session = null;
  //console.log('Usuário deslogando');
  return res.send({});
});

export { router as signoutRouter };
