"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const JWT = require("jwt-decode");
exports.UserCustom = common_1.createParamDecorator((data, req) => {
    const headerToken = req.headers['authorization'];
    const notBearerToken = headerToken.replace('Bearer ', '');
    const dataToken = JWT(notBearerToken);
    const role = [];
    role.push(dataToken.role);
    return dataToken;
});
//# sourceMappingURL=userLogged.decorator.js.map