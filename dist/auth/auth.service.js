"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const JWT = require("jwt-decode");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(authModel, usersService, jwtService) {
        this.authModel = authModel;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUserByPassword(loginAttempt) {
        let userToAttempt = await this.usersService.findOneByEmail(loginAttempt.email);
        if (!userToAttempt)
            throw new common_1.BadRequestException('email tidak ditemukan');
        const isMatch = await bcrypt.compare(loginAttempt.password, userToAttempt.password);
        if (!isMatch)
            throw new common_1.BadRequestException('password yang anda masukan salah');
        const data = this.createJwtPayload(userToAttempt);
        let jwtData = JWT(data.token);
        const saveToken = {
            token: data.token,
            user: jwtData._id,
            expiresIn: jwtData.exp,
        };
        const newItem = new this.authModel(saveToken);
        const result = newItem.save();
        return result;
    }
    async findTokenEmail(token) {
        const tokenNotBearer = token.replace('Bearer ', '');
        const data = await this.authModel.findOne({ token: tokenNotBearer });
        return data;
    }
    async validateUserByJwt(payload, token) {
        let user = await this.findTokenEmail(token);
        if (!user)
            throw new common_1.UnauthorizedException('Session login anda sudah habis');
        const data = JWT(user.token);
        const expiresIn = data.exp * 1000;
        let compareDate = expiresIn > Date.now();
        if (!compareDate) {
            await this.authModel.deleteOne(token);
            throw new common_1.UnauthorizedException('Session login anda sudah habis');
        }
        return this.createJwtPayload(payload);
    }
    createJwtPayload(user) {
        let data = {
            _id: user._id,
            email: user.email,
            role: user.role,
        };
        let jwt = this.jwtService.sign(data);
        return {
            expiresIn: 3600,
            token: jwt,
        };
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Auth')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map