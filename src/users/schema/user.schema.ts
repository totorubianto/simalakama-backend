import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
      },
    },
  },
);

// sebelum save
UserSchema.pre('save', function(next) {
  let user = this;

  // biar tidak mengulang hash password
  if (!user.isModified('password')) return next();

  // hash password jika belum dihash sebelumnya
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
