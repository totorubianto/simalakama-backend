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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dotenv = require("dotenv");
const fs = require("fs");
dotenv.config();
let ConfigService = class ConfigService {
    constructor(filePath) {
        try {
            this.envConfig = dotenv.parse(fs.readFileSync(filePath));
        }
        catch (e) {
            common_1.Logger.error(`File ${filePath} not found, app will use process.env`);
        }
    }
    get(key) {
        if (this.envConfig)
            return this.envConfig[key];
        return process.env[key];
    }
    getInt(key) {
        if (this.envConfig)
            return parseInt(this.envConfig[key], 10);
        return parseInt(process.env[key], 10);
    }
    getBoolean(key) {
        if (this.envConfig)
            return this.envConfig[key] === 'true';
        return process.env[key] === 'true';
    }
};
ConfigService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [String])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config.service.js.map