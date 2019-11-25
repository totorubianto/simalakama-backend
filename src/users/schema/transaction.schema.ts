import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const TransactionSchema = new mongoose.Schema({
  date: {
    type: String,
    unique: true,
    required: true,
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});
