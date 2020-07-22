import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    //console.log('Connecting to mongoDb');
    await mongoose.connect(
      'mongodb://auth-mongo-srv:27017/auth',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    //console.log('mongoDb connected');
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log('version: 1.2.1');
    console.log('Listening on port 3000!');
  });
};

start();
