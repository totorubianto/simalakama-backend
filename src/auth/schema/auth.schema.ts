import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;
export const AuthSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  actor: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});
