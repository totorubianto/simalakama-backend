import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const exp = Date.now() + 5*60000
export const VerificationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    token:{
      type: String,
      required:true
    },
    date: {
      createdAt: {
        type : Date,
        default : Date.now()
      },
      exp:{
        type: Date,
        default: exp
      }
    }
  },
);
