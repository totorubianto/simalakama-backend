"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.AuthSchema = new mongoose.Schema({
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
//# sourceMappingURL=auth.schema.js.map