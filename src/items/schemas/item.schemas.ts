import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const ItemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
  description: String,
  price: { type: Number, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  total_items: {
    type: Number,
    required: true,
  },
});
