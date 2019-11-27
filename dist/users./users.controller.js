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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const passport_1 = require("@nestjs/passport");
const guard_decorator_1 = require("../global/decorator/guard.decorator");
const user_guard_1 = require("../global/guard/user.guard");
const userLogged_decorator_1 = require("../global/decorator/userLogged.decorator");
const transform_interceptor_1 = require("../global/interceptor/transform.interceptor");
const http_exception_filter_1 = require("../global/filter/http-exception.filter");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const login_user_dto_1 = require("./dto/login-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const img_upload_filter_1 = require("../global/filter/img-upload.filter");
const auth_service_1 = require("../auth/auth.service");
let UsersController = class UsersController {
    constructor(usersService, authService) {
        this.usersService = usersService;
        this.authService = authService;
    }
    async create(createUserDto) {
        return await this.usersService.create(createUserDto);
    }
    async login(loginUserDto) {
        return await this.authService.validateUserByPassword(loginUserDto);
    }
    async update(updateUserDto, user) {
        return await this.usersService.updateProfile(updateUserDto, user);
    }
    findAll() {
        return this.usersService.findAll();
    }
    me(user) {
        return this.usersService.findById(user._id);
    }
    async uploadedFile(file, user) {
        return await this.usersService.uploadAvatar(file, user);
    }
};
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    common_1.Post('update'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, common_1.Body()), __param(1, userLogged_decorator_1.UserCustom()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    common_1.Get('me'),
    common_1.UseGuards(passport_1.AuthGuard()),
    __param(0, userLogged_decorator_1.UserCustom()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "me", null);
__decorate([
    common_1.Post('upload-avatar'),
    common_1.UseGuards(passport_1.AuthGuard()),
    guard_decorator_1.Roles('admin', 'user'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('avatar', {
        storage: multer_1.diskStorage({
            destination: './public/avatar',
            filename: img_upload_filter_1.editFileName,
        }),
        fileFilter: img_upload_filter_1.imageFileFilter,
    })),
    __param(0, common_1.UploadedFile()), __param(1, userLogged_decorator_1.UserCustom()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "uploadedFile", null);
UsersController = __decorate([
    common_1.Controller('users'),
    common_1.UsePipes(common_1.ValidationPipe),
    common_1.UseFilters(http_exception_filter_1.HttpExceptionFilter),
    common_1.UseInterceptors(transform_interceptor_1.TransformInterceptor),
    common_1.UseGuards(user_guard_1.RolesGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        auth_service_1.AuthService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map