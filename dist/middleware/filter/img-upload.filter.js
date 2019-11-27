"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const uuidv1 = require("uuid/v1");
const common_1 = require("@nestjs/common");
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new common_1.ForbiddenException('file extension tidak sesuai'));
    }
    callback(null, true);
};
exports.editFileName = (req, file, callback) => {
    const fileExtName = path_1.extname(file.originalname);
    callback(null, uuidv1() + fileExtName);
};
//# sourceMappingURL=img-upload.filter.js.map