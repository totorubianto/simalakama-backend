"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const config_service_1 = require("./config/config.service");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(cookieParser());
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.listen(process.env.PORT || app.get(config_service_1.ConfigService).getInt('APP_PORT'));
}
bootstrap();
//# sourceMappingURL=main.js.map