import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as slug from 'mongoose-slug-updater';
export const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        status: {
            suspended: { type: Boolean, default: false },
            upgraded: { type: String, default: 'Free' },
            emailVerifiedAt: { type: Date, default: null },
        },
        password: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        username: {
            type: String,
            require: true,
            slug: ['firstName', 'lastName'],
            unique: true,
            sparse: true,
            slugPaddingSize: 4,
        },
        avatar: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File',
        },
    },
    {
        timestamps: true,
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
