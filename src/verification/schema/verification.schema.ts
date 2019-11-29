import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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
    token:{
      type:String,
      required:true
    }
  },
);
