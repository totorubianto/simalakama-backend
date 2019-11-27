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
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const fs = require("fs");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const user = await this.userModel.findOne({ email: createUserDto.email });
        if (user)
            throw new common_1.BadRequestException('user sudah ada');
        let createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email: email });
    }
    async findById(id) {
        return await this.userModel.findById(id);
    }
    async findAll() {
        return await this.userModel.find();
    }
    async updateProfile(data, user) {
        let users = await this.findById(user._id);
        if (data.email && data.email === users.email)
            throw new common_1.BadRequestException('anda tidak melakukan perubahan apa pun pada email');
        if (data.name)
            users.name = data.name;
        if (data.email)
            users.email = data.email;
        if (data.password)
            users.password = data.password;
        return await users.save();
    }
    async uploadAvatar(data, user) {
        if (!data)
            throw new common_1.BadRequestException('harap masukan file');
        const deleteImg = await this.userModel.findById(user._id);
        const pathDelete = './public/avatar/' + deleteImg.avatar;
        if (fs.existsSync(pathDelete))
            fs.unlinkSync(pathDelete);
        const userData = await this.userModel.findByIdAndUpdate(user._id, { avatar: data.filename }, { new: true });
        if (!userData)
            throw new common_1.BadRequestException('upload file gagal');
        return userData;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map