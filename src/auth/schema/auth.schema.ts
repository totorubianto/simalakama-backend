import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const AuthSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  expiresIn: {
    type: Number,
    required: true,
  },
});
