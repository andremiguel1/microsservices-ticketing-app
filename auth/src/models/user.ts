import mongoose from 'mongoose';
import { Password } from '../utils/password';

//Interface que descreve os atributos necessários para se criar um usuário
interface UserAttributes {
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  console.log(this.get('password'));
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  console.log(this.get('password'));

  done();
});

userSchema.statics.build = (userAttrs: UserAttributes) => {
  return new User(userAttrs);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
