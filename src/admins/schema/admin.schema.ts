import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AdminRoleEnum } from '../../global/enum/admin-role.enum';

const AdminSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, default: null },
        email: { type: String, required: true, unique: true },
        phoneNumber: { type: String, required: true, unique: true },
        password: { type: String, default: null },
        dateOfBirth: { type: Date, default: null },
        role: { type: String, enum: AdminRoleEnum },
        status: {
            suspended: { type: Boolean, default: false },
            emailVerifiedAt: { type: Date, default: null },
        },
    },
    { timestamps: true },
);

const hidden = ['password', '__v'];

AdminSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    if (!user.password) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

AdminSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

AdminSchema.methods.toJSON = function() {
    var obj = this.toObject();
    for (var i = hidden.length - 1; i >= 0; i--) {
        delete obj[hidden[i]];
    }
    return obj;
};

export { AdminSchema };
