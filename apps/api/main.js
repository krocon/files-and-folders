/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
let AppController = class AppController {
    getApiInfos() {
        return app_service_1.AppService.availableRoutes;
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)("/"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Array)
], AppController.prototype, "getApiInfos", null);
AppController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)()
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const app_controller_1 = __webpack_require__("./apps/api/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const sysinfo_module_1 = __webpack_require__("./apps/api/src/app/sysinfo/sysinfo.module.ts");
const drives_module_1 = __webpack_require__("./apps/api/src/app/drives/drives.module.ts");
const file_module_1 = __webpack_require__("./apps/api/src/app/file-content/file.module.ts");
const file_action_module_1 = __webpack_require__("./apps/api/src/app/file-action/file-action.module.ts");
const walk_module_1 = __webpack_require__("./apps/api/src/app/walk/walk.module.ts");
const dir_module_1 = __webpack_require__("./apps/api/src/app/dir/dir.module.ts");
const custom_css_module_1 = __webpack_require__("./apps/api/src/app/customcss/custom-css.module.ts");
const config_module_1 = __webpack_require__("./apps/api/src/app/config/config.module.ts");
const find_module_1 = __webpack_require__("./apps/api/src/app/find/find.module.ts");
let AppModule = class AppModule {
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            sysinfo_module_1.SysinfoModule,
            drives_module_1.DrivesModule.forRoot(process.env.FNF_INCOMPATIBLE_PATHS ? process.env.FNF_INCOMPATIBLE_PATHS.split(",") : undefined),
            config_module_1.ConfigModule.forRoot(process.env),
            file_module_1.FileModule,
            file_action_module_1.FileActionModule,
            walk_module_1.WalkModule,
            find_module_1.FindModule,
            dir_module_1.DirModule,
            custom_css_module_1.CustomCssModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, "..", "files-and-folders")
            })
        ],
        controllers: [
            app_controller_1.AppController
        ],
        providers: [
            app_service_1.AppService
        ]
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let AppService = class AppService {
};
AppService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/api/src/app/config/config.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_service_1 = __webpack_require__("./apps/api/src/app/config/config.service.ts");
let ConfigController = class ConfigController {
    constructor(configService) {
        this.configService = configService;
    }
    getConfig() {
        return this.configService.getData();
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)("config"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Object)
], ConfigController.prototype, "getConfig", null);
ConfigController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_service_1.ConfigService !== "undefined" && config_service_1.ConfigService) === "function" ? _a : Object])
], ConfigController);
exports.ConfigController = ConfigController;


/***/ }),

/***/ "./apps/api/src/app/config/config.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ConfigModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_service_1 = __webpack_require__("./apps/api/src/app/config/config.service.ts");
const config_controller_1 = __webpack_require__("./apps/api/src/app/config/config.controller.ts");
let ConfigModule = ConfigModule_1 = class ConfigModule {
    static forRoot(config) {
        if (config) {
            config_service_1.ConfigService.config = config;
            common_1.Logger.log("ConfigModule config -> " + JSON.stringify(config, null, 2));
        }
        return {
            module: ConfigModule_1,
            providers: [
                config_service_1.ConfigService
            ]
        };
    }
};
ConfigModule = ConfigModule_1 = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [config_controller_1.ConfigController]
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;


/***/ }),

/***/ "./apps/api/src/app/config/config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ConfigService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let ConfigService = ConfigService_1 = class ConfigService {
    getData() {
        return ConfigService_1.config;
    }
    hasRestrictedContainerPaths() {
        return !!ConfigService_1.config.FNF_CONTAINER_PATHES;
    }
};
ConfigService = ConfigService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], ConfigService);
exports.ConfigService = ConfigService;


/***/ }),

/***/ "./apps/api/src/app/customcss/custom-css.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomCssGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
let CustomCssGateway = class CustomCssGateway {
    updateCss(cssvars) {
        this.server.emit("onCssUpdate", cssvars);
    }
};
(0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketServer)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], CustomCssGateway.prototype, "server", void 0);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("updateCss"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof fnf_data_1.CssColors !== "undefined" && fnf_data_1.CssColors) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], CustomCssGateway.prototype, "updateCss", null);
CustomCssGateway = (0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketGateway)(environment_1.environment.websocketPort, environment_1.environment.websocketOptions)
], CustomCssGateway);
exports.CustomCssGateway = CustomCssGateway;


/***/ }),

/***/ "./apps/api/src/app/customcss/custom-css.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomCssModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const custom_css_gateway_1 = __webpack_require__("./apps/api/src/app/customcss/custom-css.gateway.ts");
let CustomCssModule = class CustomCssModule {
};
CustomCssModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [
            custom_css_gateway_1.CustomCssGateway
        ],
        exports: [
            custom_css_gateway_1.CustomCssGateway
        ]
    })
], CustomCssModule);
exports.CustomCssModule = CustomCssModule;


/***/ }),

/***/ "./apps/api/src/app/dir/dir-service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const fs = __webpack_require__("fs-extra");
const path = __webpack_require__("path");
const stats_to_file_1 = __webpack_require__("./apps/api/src/app/dir/stats-to-file.ts");
const unpack_list_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/unpack-list.fn.ts");
let DirService = class DirService {
    readdir(para) {
        const p = para.path;
        if ((0, fnf_data_1.isZipUrl)(p)) {
            const zipUrlInfo = (0, fnf_data_1.getZipUrlInfo)(p);
            return new Promise((resolve, reject) => {
                (0, unpack_list_fn_1.unpacklist)(zipUrlInfo.zipUrl)
                    .then(dirEvent => {
                    return resolve([dirEvent]);
                }, error => reject(error));
            });
        }
        else {
            return new Promise((resolve, reject) => {
                const fileItems = [];
                try {
                    const files = fs.readdirSync(p);
                    for (let idx = 0; idx < files.length; idx++) {
                        const f = files[idx];
                        const ff = path.join(p, "/", f);
                        const fileItem = new fnf_data_1.FileItem(p, (0, fnf_data_1.fixPath)(f), path.extname(f), null);
                        fileItems.push(fileItem);
                        try {
                            const stats = fs.statSync(ff);
                            (0, stats_to_file_1.stats2FileItem)(stats, fileItem);
                        }
                        catch (e) {
                            fileItem.error = e;
                            console.info("DirGateWay() stats error:", e.message);
                        }
                    } // for
                    resolve([new fnf_data_1.DirEvent(p, fileItems, true, true, fileItems.length, "", "list")]);
                }
                catch (e) {
                    console.error(e);
                    reject(e);
                }
            });
        }
    }
};
DirService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], DirService);
exports.DirService = DirService;


/***/ }),

/***/ "./apps/api/src/app/dir/dir.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const dir_service_1 = __webpack_require__("./apps/api/src/app/dir/dir-service.ts");
let DirController = class DirController {
    constructor(dirService) {
        this.dirService = dirService;
    }
    readdir(para) {
        return this.dirService.readdir(para);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)("readdir"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], DirController.prototype, "readdir", null);
DirController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof dir_service_1.DirService !== "undefined" && dir_service_1.DirService) === "function" ? _c : Object])
], DirController);
exports.DirController = DirController;


/***/ }),

/***/ "./apps/api/src/app/dir/dir.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs-extra");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const chokidar_1 = __webpack_require__("chokidar");
const rxjs_1 = __webpack_require__("rxjs");
const watch_event_data_1 = __webpack_require__("./apps/api/src/app/dir/watch-event.data.ts");
const operators_1 = __webpack_require__("rxjs/operators");
const unpack_list_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/unpack-list.fn.ts");
const stats_to_file_1 = __webpack_require__("./apps/api/src/app/dir/stats-to-file.ts");
let DirGateway = class DirGateway {
    constructor() {
        this.fsWatcher = new chokidar_1.FSWatcher({
            ignoreInitial: true,
            disableGlobbing: true,
            depth: 0,
            atomic: true
        });
        new rxjs_1.Observable((subscriber) => {
            this.fsWatcher
                .on("all", (event, f) => {
                subscriber.next(new watch_event_data_1.WatchEventData(event, f));
            });
        })
            .pipe((0, operators_1.distinctUntilChanged)((prev, curr) => (prev === null || prev === void 0 ? void 0 : prev.event) === curr.event && (prev === null || prev === void 0 ? void 0 : prev.file) === curr.file))
            .subscribe(wed => {
            if (wed.event === "add" || wed.event === "addDir") {
                const fileItem = this.createFileItem(wed.file);
                const dirEvent = new fnf_data_1.DirEvent(fileItem.dir, [fileItem], false, false, 1, "", wed.event);
                this.server.emit("watching", dirEvent);
            }
            else if (wed.event === "unlink" || wed.event === "unlinkDir" || wed.event === "change") {
                const fileItem = this.createFileItemByFullPath(wed.file);
                fileItem.isDir = wed.event === "unlinkDir";
                const dirEvent = new fnf_data_1.DirEvent(fileItem.dir, [fileItem], false, false, 1, "", wed.event);
                this.server.emit("watching", dirEvent);
            }
        }, error => {
            console.error(error);
        });
    }
    watch(para) {
        this.fsWatcher.add(para.path);
    }
    unwatch(para) {
        this.fsWatcher.unwatch(para.path);
    }
    onDir(para) {
        let p = para.path;
        if (p.indexOf(":") === p.length - 1)
            p = path.join(p, "/");
        p = (0, fnf_data_1.fixPath)(p);
        const emmitKey = `dir${para.rid}`;
        try {
            if ((0, fnf_data_1.isZipUrl)(p)) {
                this.readZipDir(p, emmitKey);
            }
            else {
                this.readdir(p, emmitKey);
            }
        }
        catch (e) {
            console.error(e);
            const ev = new fnf_data_1.DirEvent(p, [], true, true, 0, e);
            this.server.emit(emmitKey, ev);
        }
    }
    createFileItemByFullPath(full) {
        return new fnf_data_1.FileItem(path.dirname(full), path.basename(full), path.extname(full));
    }
    readZipDir(file, emmitKey) {
        const zipUrlInfo = (0, fnf_data_1.getZipUrlInfo)(file);
        (0, unpack_list_fn_1.unpacklist)(zipUrlInfo.zipUrl)
            .then(ev => {
            this.server.emit(emmitKey, ev);
        });
    }
    readdir(p, emmitKey) {
        const socket = this.server;
        const files = fs.readdirSync(p); //, (error, files) => {
        const allAtOnce = files.length < 10000;
        if (!allAtOnce) {
            const previews = files.map((f) => new fnf_data_1.FileItem(p, (0, fnf_data_1.fixPath)(f), path.extname(f), null));
            const end = files.length === 0;
            const firstEvent = new fnf_data_1.DirEvent(p, previews, true, end, files.length, "", "listpreview");
            socket.emit(emmitKey, firstEvent);
        }
        const fileItems = [];
        for (let idx = 0; idx < files.length; idx++) {
            const f = files[idx];
            const ff = path.join(p, "/", f);
            const fileItem = new fnf_data_1.FileItem(p, (0, fnf_data_1.fixPath)(f), path.extname(f), null);
            fileItems.push(fileItem);
            const dirEvent = new fnf_data_1.DirEvent(p, [fileItem]);
            try {
                const stats = fs.statSync(ff);
                (0, stats_to_file_1.stats2FileItem)(stats, fileItem);
            }
            catch (e) {
                fileItem.error = e;
                console.info("DirGateWay() stats error:", e.message);
            }
            if (idx === files.length - 1) {
                dirEvent.end = true;
            }
            if (!allAtOnce) {
                socket.emit(emmitKey, dirEvent);
            }
        } // for
        if (allAtOnce) {
            const dirEvent = new fnf_data_1.DirEvent(p, fileItems, true, true, fileItems.length, "", "list");
            socket.emit(emmitKey, dirEvent);
        }
    }
    createFileItem(file) {
        const stats = fs.statSync(file);
        const dir = path.dirname(file);
        const base = path.basename(file);
        const ext = path.extname(file);
        const fileItem = new fnf_data_1.FileItem(dir, base, ext, null);
        (0, stats_to_file_1.stats2FileItem)(stats, fileItem);
        return fileItem;
    }
};
(0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketServer)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], DirGateway.prototype, "server", void 0);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("watch"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], DirGateway.prototype, "watch", null);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("unwatch"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], DirGateway.prototype, "unwatch", null);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("dir"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], DirGateway.prototype, "onDir", null);
DirGateway = (0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketGateway)(environment_1.environment.websocketPort, environment_1.environment.websocketOptions),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], DirGateway);
exports.DirGateway = DirGateway;


/***/ }),

/***/ "./apps/api/src/app/dir/dir.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const dir_gateway_1 = __webpack_require__("./apps/api/src/app/dir/dir.gateway.ts");
const dir_service_1 = __webpack_require__("./apps/api/src/app/dir/dir-service.ts");
const dir_controller_1 = __webpack_require__("./apps/api/src/app/dir/dir.controller.ts");
let DirModule = class DirModule {
};
DirModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            dir_controller_1.DirController
        ],
        providers: [
            dir_gateway_1.DirGateway,
            dir_service_1.DirService
        ],
        exports: [
            dir_gateway_1.DirGateway
        ]
    })
], DirModule);
exports.DirModule = DirModule;


/***/ }),

/***/ "./apps/api/src/app/dir/stats-to-file.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stats2FileItem = void 0;
function stats2FileItem(stats, fileItem) {
    // see https://npmdoc.github.io/node-npmdoc-fs-extra/build/apidoc.html#apidoc.element.fs-extra.Stats
    if (stats) {
        fileItem.size = stats.isDirectory() ? null : stats.size;
        fileItem.date = new Date(stats.atime).toISOString();
        fileItem.isDir = stats.isDirectory();
    }
    return fileItem;
}
exports.stats2FileItem = stats2FileItem;


/***/ }),

/***/ "./apps/api/src/app/dir/watch-event.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WatchEventData = void 0;
class WatchEventData {
    constructor(event, file) {
        this.event = event;
        this.file = file;
    }
}
exports.WatchEventData = WatchEventData;


/***/ }),

/***/ "./apps/api/src/app/drives/drives.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrivesController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const drives_service_1 = __webpack_require__("./apps/api/src/app/drives/drives.service.ts");
const rxjs_1 = __webpack_require__("rxjs");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
let DrivesController = class DrivesController {
    constructor(drivesService) {
        this.drivesService = drivesService;
    }
    getData() {
        return this.drivesService.getData();
    }
    exists(para) {
        return this.drivesService.exists(para.path);
    }
    checkPath(para) {
        return this.drivesService.checkPath(para.path);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)("drives"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], DrivesController.prototype, "getData", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("exists"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Boolean)
], DrivesController.prototype, "exists", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("checkpath"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", String)
], DrivesController.prototype, "checkPath", null);
DrivesController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof drives_service_1.DrivesService !== "undefined" && drives_service_1.DrivesService) === "function" ? _d : Object])
], DrivesController);
exports.DrivesController = DrivesController;


/***/ }),

/***/ "./apps/api/src/app/drives/drives.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DrivesModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrivesModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const drives_service_1 = __webpack_require__("./apps/api/src/app/drives/drives.service.ts");
const drives_controller_1 = __webpack_require__("./apps/api/src/app/drives/drives.controller.ts");
let DrivesModule = DrivesModule_1 = class DrivesModule {
    static forRoot(restrictedPaths) {
        if (restrictedPaths) {
            drives_service_1.DrivesService.restrictedPaths = restrictedPaths;
            common_1.Logger.log("DrivesService.restrictedPaths -> " + drives_service_1.DrivesService.restrictedPaths);
        }
        return {
            module: DrivesModule_1,
            providers: [
                drives_service_1.DrivesService
            ]
        };
    }
};
DrivesModule = DrivesModule_1 = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        controllers: [
            drives_controller_1.DrivesController
        ]
    })
], DrivesModule);
exports.DrivesModule = DrivesModule;


/***/ }),

/***/ "./apps/api/src/app/drives/drives.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var DrivesService_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DrivesService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const os = __webpack_require__("os");
const child_process_1 = __webpack_require__("child_process");
const rxjs_1 = __webpack_require__("rxjs");
const fse = __webpack_require__("fs-extra");
const path = __webpack_require__("path");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
let DrivesService = DrivesService_1 = class DrivesService {
    constructor() {
        this.containerMode = false;
        this.containerMode = this.exists(fnf_data_1.VOLS_DIR);
        if (this.containerMode) {
            try {
                const ffs = fse.readdirSync(fnf_data_1.VOLS_DIR);
                this.containerVols = ffs
                    .filter(n => n.indexOf('.') === -1)
                    .map(n => path.join(fnf_data_1.VOLS_DIR, '/', n));
            }
            catch (e) {
                // ignore
            }
        }
    }
    getData() {
        var _a;
        if ((_a = this.containerVols) === null || _a === void 0 ? void 0 : _a.length) {
            return (0, rxjs_1.of)(this.containerVols);
        }
        return (0, rxjs_1.from)(this.getDrivesPromise());
    }
    hasRestrictedPaths() {
        var _a;
        return !!((_a = DrivesService_1.restrictedPaths) === null || _a === void 0 ? void 0 : _a.length);
    }
    exists(path) {
        try {
            return fse.existsSync(path);
        }
        catch (e) {
            try {
                // zip-Url?
                return fse.existsSync(path.split(':')[0]);
            }
            catch (e) {
                return false;
            }
        }
    }
    /**
     *
     * @param path  the path (if exists) , else the next possible path
     */
    checkPath(path) {
        path = (0, fnf_data_1.fixPath)(path);
        while (path.length > 0) {
            if (this.exists(path)) {
                return path;
            }
            if (path.indexOf('/') > -1) {
                path = path.substr(0, path.lastIndexOf('/'));
            }
            else {
                return '/';
            }
        }
        return '/';
    }
    getWinDrives(callback) {
        if (os.platform().indexOf('win') !== 0) {
            return callback(null, []);
        } // for windows only.
        let stdout = '';
        const list = (0, child_process_1.spawn)('cmd');
        list.stdout.on('data', function (data) {
            stdout += data;
        });
        list.stderr.on('data', function (data) {
            console.error('stderr: ' + data);
        });
        list.on('exit', function (code) {
            if (code == 0) {
                let data = stdout.split('\r\n');
                data = data.splice(4, data.length - 7);
                data = data
                    .map(Function.prototype.call, String.prototype.trim)
                    .map(s => s + '/');
                callback(null, data);
            }
            else {
                callback(code, null);
            }
        });
        list.stdin.write('wmic logicaldisk get caption\n');
        list.stdin.end();
    }
    getDrivesPromise() {
        return new Promise((resolve, reject) => {
            this.getWinDrives((err, info) => {
                if (err) {
                    return reject(err);
                }
                resolve(info);
            });
        });
    }
};
DrivesService = DrivesService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [])
], DrivesService);
exports.DrivesService = DrivesService;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/common/clone.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.clone = void 0;
function clone(o) {
    return JSON.parse(JSON.stringify(o));
}
exports.clone = clone;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/common/dummy.fn.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dummy = void 0;
function dummy(para) {
    return new Promise((resolve, reject) => {
        reject("Error: Unknown cmd: " + para.cmd);
    });
}
exports.dummy = dummy;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/common/slash-2-backslash.fn.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.slash2backSlash = void 0;
function slash2backSlash(s) {
    return s.replace(/\//g, "\\");
}
exports.slash2backSlash = slash2backSlash;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/copy.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.copy = void 0;
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const os = __webpack_require__("os");
const path = __webpack_require__("path");
const fse = __webpack_require__("fs-extra");
const child_process_1 = __webpack_require__("child_process");
const slash_2_backslash_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/slash-2-backslash.fn.ts");
const clone_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/clone.ts");
const common_1 = __webpack_require__("@nestjs/common");
const platform = os.platform();
const osx = platform === "darwin";
const windows = platform.indexOf("win") === 0;
const linux = platform.indexOf("linux") === 0;
const logger = new common_1.Logger("fn-copy");
function copy(para) {
    function createRet(targetUrl, para) {
        const item = (0, clone_1.clone)(para.source);
        item.dir = targetUrl;
        const ret = [];
        ret.push(new fnf_data_1.DirEvent(para.source.dir, [para.source], false, false, 1, "", "unselect"));
        ret.push(new fnf_data_1.DirEvent(targetUrl, [item], false, false, 1, "", item.isDir ? "addDir" : "add"));
        return ret;
    }
    return new Promise((resolve, reject) => {
        if (!para || !para.source || !para.target) {
            reject("Invalid argument exception!");
            return;
        }
        const ptarget = para.target;
        const psource = para.source;
        const sourceUrl = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base ? psource.base : ""));
        const targetUrl = (0, fnf_data_1.fixPath)(path.join(ptarget.dir, "/", ptarget.base ? ptarget.base : ""));
        fse.stat(sourceUrl, (error, stats) => {
            if (!stats) {
                reject(error);
                return;
            }
            const sourceIsDirectory = stats.isDirectory(); // source only, target not exists!
            const targetMkdir = sourceIsDirectory ? targetUrl : ptarget.dir;
            fse.mkdirs(targetMkdir, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                let cmd;
                if (osx) {
                    // cp -r "/Users/marc/__test/src/DUDEN Deutsch 3. Klasse - Lernkalender.pdf" "/Users/marc/__test/target"
                    // cp -r "/Users/marc/__test/src/a" "/Users/marc/__test/target"
                    cmd = "cp -r \"" + sourceUrl + "\" \"" + ptarget.dir + "\"";
                }
                else if (windows) {
                    const src = (0, slash_2_backslash_fn_1.slash2backSlash)(sourceUrl);
                    if (sourceIsDirectory) {
                        // xcopy  "C:\Users\kronmar\bbbbb\marc\a" "C:\Users\kronmar\bbbbb\marc2\a\" /E /C /I /H /R /Y
                        const t1 = (0, slash_2_backslash_fn_1.slash2backSlash)(ptarget.dir + "/" + psource.base + "/");
                        cmd = `xcopy  "${src}" "${t1}" /E /C /I /H /R /Y `;
                    }
                    else {
                        // xcopy  "C:\Users\kronmar\bbbbb\marc\zipEntries.js" "C:\Users\kronmar\bbbbb\marc2" /Y
                        const td = (0, slash_2_backslash_fn_1.slash2backSlash)(ptarget.dir);
                        cmd = `xcopy  "${src}" "${td}" /Y `;
                    }
                }
                else if (linux) {
                    if (sourceIsDirectory) {
                        // dir to dir:
                        // rsync -avzh /root/rpmpkgs /tmp/backups/
                        cmd = `rsync -avzh "${sourceUrl}" "${targetUrl}"`;
                    }
                    else {
                        // file to dir:
                        // rsync -zvh backup.tar.gz /tmp/backups/
                        cmd = `rsync -zvh "${sourceUrl}" "${targetUrl}"`;
                    }
                }
                logger.log("cmd: " + cmd);
                (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
                    if (error) {
                        logger.error(error);
                        // zweiter Versuch:
                        const to = path.join(targetUrl, "/", para.source.base);
                        fse.copy(sourceUrl, to, (error) => {
                            if (error) {
                                logger.error(error);
                                reject(error);
                            }
                            else {
                                const ret = createRet(targetUrl, para);
                                resolve(ret);
                            }
                        });
                    }
                    else {
                        const ret = createRet(targetUrl, para);
                        resolve(ret);
                    }
                });
            });
        });
    });
}
exports.copy = copy;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/mkdir.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mkdir = void 0;
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const path = __webpack_require__("path");
const fse = __webpack_require__("fs-extra");
const clone_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/clone.ts");
function mkdir(para) {
    return new Promise((resolve, reject) => {
        if (!para || !para.target) {
            reject("Invalid argument exception!");
            return;
        }
        const ptarget = para.target;
        const targetUrl = (0, fnf_data_1.fixPath)(path.join(ptarget.dir, "/", ptarget.base ? ptarget.base : ""));
        fse.mkdir(targetUrl, (error) => {
            if (error) {
                reject(error);
            }
            else {
                fse.stat(targetUrl, (error, stats) => {
                    if (error || !stats) {
                        reject(error);
                    }
                    else {
                        const targetItem = (0, clone_1.clone)(para.target);
                        const item1 = new fnf_data_1.DirEvent(para.target.dir, [targetItem], false, false, 1, "", "addDir");
                        const item2 = new fnf_data_1.DirEvent(para.target.dir, [targetItem], false, false, 1, "", "select");
                        const ret = [item1, item2];
                        resolve(ret);
                    }
                });
            }
        });
    });
}
exports.mkdir = mkdir;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/move.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.move = void 0;
const os = __webpack_require__("os");
const path = __webpack_require__("path");
const fse = __webpack_require__("fs-extra");
const child_process_1 = __webpack_require__("child_process");
const slash_2_backslash_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/slash-2-backslash.fn.ts");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const clone_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/clone.ts");
const common_1 = __webpack_require__("@nestjs/common");
const platform = os.platform();
const osx = platform === "darwin";
const windows = platform.indexOf("win") === 0;
const linux = platform.indexOf("linux") === 0;
const logger = new common_1.Logger("fn-move");
function move(para) {
    return new Promise((resolve, reject) => {
        if (!para || !para.source || !para.target) {
            reject("Invalid argument exception!");
            return;
        }
        const ptarget = para.target;
        const psource = para.source;
        const source = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base));
        const target = (0, fnf_data_1.fixPath)(path.join(ptarget.dir, "/", ptarget.base));
        fse.stat(source, (error, stats) => {
            const sourceIsDirectory = stats.isDirectory(); // source only, target not exists!
            const targetMkdir = sourceIsDirectory ? target : ptarget.dir;
            fse.mkdirs(targetMkdir, (error) => {
                if (error) {
                    reject(error);
                    return;
                }
                let cmd;
                //const t = target;
                if (osx) {
                    // cmd mv "/Users/marc/__test/src/a" "/Users/marc/__test/target"
                    // cmd mv "/Users/marc/__test/src/DUDEN Deutsch 3. Klasse - Lernkalender.pdf" "/Users/marc/__test/target"
                    cmd = "mv \"" + source + "\" \"" + ptarget.dir + "\"";
                }
                else if (windows) {
                    const bsTargetDir = (0, slash_2_backslash_fn_1.slash2backSlash)(ptarget.dir);
                    if (psource.isDir) {
                        // robocopy "test\demo\a1" ".\test\demo\mkdir1\a1" /e /move
                        let bsSource = `${(0, slash_2_backslash_fn_1.slash2backSlash)(source)}`;
                        cmd = `robocopy  "${bsSource}" "${bsTargetDir}" /e /move`;
                    }
                    else {
                        const bsSourceDir = (0, slash_2_backslash_fn_1.slash2backSlash)(psource.dir);
                        cmd = `robocopy  "${bsSourceDir}" "${bsTargetDir}" ${psource.base}  /move`;
                    }
                }
                else if (linux) {
                    if (sourceIsDirectory) {
                        // dir to dir:
                        // rsync -avzh /root/rpmpkgs /tmp/backups/
                        cmd = `rsync --remove-source-files -avzh "${source}" "${target}"`;
                    }
                    else {
                        // file to dir:
                        // rsync -zvh backup.tar.gz /tmp/backups/
                        cmd = `rsync --remove-source-files -zvh "${source}" "${target}"`;
                    }
                }
                logger.log("cmd: " + cmd);
                (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
                    const realError = stdout === null || stdout === void 0 ? void 0 : stdout.match(/[\s\S]*----[\s\S]*(ERROR\s*:?\s*[\s\S]*?)(Simple Usage|$)/);
                    const item1 = new fnf_data_1.DirEvent(para.source.dir, [para.source], false, false, 1, "", para.source.isDir ? "unlinkDir" : "unlink");
                    const targetItem = (0, clone_1.clone)(para.target);
                    const item2 = new fnf_data_1.DirEvent(para.target.dir, [targetItem], false, false, 1, "", para.source.isDir ? "addDir" : "add");
                    const ret = [item1, item2];
                    if (realError) {
                        logger.error(realError);
                        // zweiter Versuch:
                        fse.move(source, target, (error) => {
                            if (error) {
                                logger.error(error);
                                reject(error);
                            }
                            else {
                                resolve(ret);
                            }
                        });
                    }
                    else {
                        resolve(ret);
                    }
                });
            });
        });
    });
}
exports.move = move;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/open.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.open = void 0;
const path = __webpack_require__("path");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const child_process_1 = __webpack_require__("child_process");
const os = __webpack_require__("os");
const platform = os.platform();
const osx = platform === "darwin";
const linux = platform.indexOf("linux") === 0;
const windows = platform.indexOf("win") === 0;
function execute(cmd, cmdAlternate) {
    return new Promise((resolve, reject) => {
        if (!cmd) {
            reject("Invalid argument exception!");
            return;
        }
        (0, child_process_1.exec)(cmd, (error, stdout, stderr) => {
            if (error) {
                // Second try:
                (0, child_process_1.exec)(cmdAlternate, (error, stdout, stderr) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve("ok");
                    }
                });
            }
            else {
                resolve("ok");
            }
        });
    });
}
function open(para) {
    return new Promise((resolve, reject) => {
        const psource = para.source;
        const source = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base));
        let cmd;
        let cmdAlternate;
        if (windows) {
            // http://stackoverflow.com/questions/12010103/launch-a-program-from-command-line-without-opening-a-new-window
            cmd = " start \"\" /max \"" + source + "\" ";
        }
        else if (osx) {
            cmd = " open  \"" + source + "\" ";
        }
        else if (linux) {
            cmd = "evince -f \"" + source + "\" ";
            cmdAlternate = "kpdf \"" + source + "\" ";
        }
        else {
            reject("open file-content not supported for system.");
            return;
        }
        execute(cmd, cmdAlternate);
        // open PDF:
        //
        // W i n d o w s :
        // http://stackoverflow.com/questions/6557920/how-to-open-a-pdf-in-fullscreen-view-via-command-line
        // var cmd = ' start "" /max "h:\\docs\\allg\\ZEISS Lisa\\AT-LISA-tri-family-Datasheet-DE.pdf" ';
        //
        // M a c   O S   X
        // 'open h:\\docs\\allg\\ZEISS Lisa\\AT-LISA-tri-family-Datasheet-DE.pdf'
        //
        // g n o m e   d e s k t o p :
        // https://help.gnome.org/users/evince/stable/commandline.html.en
        // http://stackoverflow.com/questions/264395/linux-equivalent-of-the-mac-os-x-open-command
        // evince -f file-content.pdf
        //
        // K D E   d e s k t o p :
        //  kpdf file-content.pdf
        //
        // TODO   siehe D:\repos\node-files-and-folders-server\lib\socket\cmd\open.js
        // fse.remove(source, function(error) {
        //   if (error) {
        //     ret.error = error;
        //     reject(ret);
        //   } else {
        //     console.log('remove done: ' + source, error);
        //   resolve(new DoEvent(para.source, para.target, para.cmd, error?.message));
        // }
        // });
    });
}
exports.open = open;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/remove.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.remove = void 0;
const path = __webpack_require__("path");
const fse = __webpack_require__("fs-extra");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
function remove(para) {
    return new Promise((resolve, reject) => {
        if (!para || !para.source) {
            reject("Invalid argument exception!");
            return;
        }
        const psource = para.source;
        const source = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base));
        const ret = [];
        fse.remove(source, (error) => {
            if (error) {
                reject(error);
            }
            else {
                ret.push(new fnf_data_1.DirEvent(para.source.dir, [para.source], false, false, 1, "", para.source.isDir ? "unlinkDir" : "unlink"));
                resolve(ret);
            }
        });
    });
}
exports.remove = remove;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/rename.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rename = void 0;
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const path = __webpack_require__("path");
const fse = __webpack_require__("fs-extra");
const clone_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/clone.ts");
function rename(para) {
    return new Promise((resolve, reject) => {
        if (!para || !para.source || !para.target) {
            reject("Invalid argument exception!");
            return;
        }
        const ptarget = para.target;
        const psource = para.source;
        const sourceUrl = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base ? psource.base : ""));
        const targetUrl = (0, fnf_data_1.fixPath)(path.join(ptarget.dir, "/", ptarget.base ? ptarget.base : ""));
        fse.rename(sourceUrl, targetUrl, (error) => {
            if (error) {
                reject(error);
                return;
            }
            fse.stat(targetUrl, (error, stats) => {
                if (error || !stats) {
                    reject(error);
                }
                else {
                    const targetItem = (0, clone_1.clone)(para.target);
                    const item1 = new fnf_data_1.DirEvent(para.target.dir, [targetItem], false, false, 1, "", targetItem.isDir ? "addDir" : "add");
                    const item2 = new fnf_data_1.DirEvent(para.source.dir, [para.source], false, false, 1, "", para.source.isDir ? "addDir" : "add");
                    const ret = [item1, item2];
                    resolve(ret);
                }
                // var msg = {
                //   event: 'created',
                //   panelIndex:action.panelIndex,
                //   item: {dir: action.target.dir, base: slash.fixPath(action.target.base)}
                // };
                // if (stats) {
                //   msg.item.size = stats.isDirectory() ? null : stats.size;
                //   msg.item.date = stats.atime;
                //   msg.item.isDir = stats.isDirectory();
                // }
                //
                // var back = {
                //   events: [
                //     {
                //       event: 'removed',
                //       panelIndex: action.panelIndex,
                //       item: action.src
                //     },
                //     msg,
                //     {
                //       event: 'focus',
                //       panelIndex: action.panelIndex,
                //       item: action.target
                //     }
                //   ],
                //   error: null
                // };
            });
        });
    });
}
exports.rename = rename;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/unpack-list.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unpacklist = void 0;
const tslib_1 = __webpack_require__("tslib");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const StreamZip = __webpack_require__("node-stream-zip");
const path = __webpack_require__("path");
function unpacklist(file) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (!file) {
                reject("Invalid argument exception!");
                return;
            }
            try {
                const zip = new StreamZip.async({ file });
                const entries = yield zip.entries();
                const fileItems = [];
                const zipDir = file + ":";
                const dirEvent = new fnf_data_1.DirEvent(zipDir, fileItems, true, true, fileItems.length, "", "list");
                for (const entry of Object.values(entries)) {
                    const entryDir = path.dirname(entry.name);
                    const entryBase = path.basename(entry.name);
                    if (entry.isDirectory || entry.isFile) {
                        let dir = (zipDir + ":/" + entryDir).replace(/::/g, ":");
                        if (dir.endsWith("/.")) {
                            dir = dir.substr(0, dir.length - 2);
                        }
                        fileItems.push(new fnf_data_1.FileItem(dir, entryBase, "", "", "", entry.size, entry.isDirectory, false));
                    }
                }
                yield zip.close();
                resolve(dirEvent);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.unpacklist = unpacklist;


/***/ }),

/***/ "./apps/api/src/app/file-action/action/unpack.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.unpack = void 0;
const tslib_1 = __webpack_require__("tslib");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const path = __webpack_require__("path");
const StreamZip = __webpack_require__("node-stream-zip");
const fse = __webpack_require__("fs-extra");
function unpack(para) {
    return new Promise((resolve, reject) => {
        if (!para || !para.source || !para.target) {
            reject("Invalid argument exception!");
            return;
        }
        const ptarget = para.target;
        const psource = para.source;
        const sourceUrl = (0, fnf_data_1.fixPath)(path.join(psource.dir, "/", psource.base ? psource.base : ""));
        const targetUrl = (0, fnf_data_1.fixPath)(path.join(ptarget.dir, "/", ptarget.base ? ptarget.base : ""));
        fse.ensureDirSync(targetUrl);
        const zip = new StreamZip.async({ file: sourceUrl });
        zip.extract(null, targetUrl).then((count) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield zip.close();
            resolve(count);
        }));
    });
}
exports.unpack = unpack;


/***/ }),

/***/ "./apps/api/src/app/file-action/file-action.constroller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FileActionController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileActionController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const file_service_1 = __webpack_require__("./apps/api/src/app/file-action/file.service.ts");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const fs = __webpack_require__("fs-extra");
const path = __webpack_require__("path");
let FileActionController = FileActionController_1 = class FileActionController {
    constructor(fileService) {
        this.fileService = fileService;
        this.logger = new common_1.Logger(FileActionController_1.name);
    }
    onDo(para) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            this.logger.log("cmd:", para.cmd);
            let fn = this.fileService.getFunctionByCmd(para.cmd);
            return fn(para);
        });
    }
    unpacklist(para) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.fileService.unpacklist(para.path);
        });
    }
    walkdir(walkParaData) {
        const walkData = new fnf_data_1.WalkData();
        const buf = [...walkParaData.files];
        while (buf.length) {
            const ff = buf.pop();
            const stats = fs.statSync(ff);
            if (stats.isDirectory()) {
                walkData.folderCount++;
                const ffs = fs.readdirSync(ff);
                ffs.forEach(f => buf.push(path.join(ff, f)));
            }
            else if (stats.isFile()) {
                walkData.fileCount++;
                walkData.sizeSum = walkData.sizeSum + stats.size;
            }
        }
        return walkData;
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(""),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof fnf_data_1.FilePara !== "undefined" && fnf_data_1.FilePara) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], FileActionController.prototype, "onDo", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("unpacklist"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_c = typeof fnf_data_1.DirPara !== "undefined" && fnf_data_1.DirPara) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FileActionController.prototype, "unpacklist", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)("walkdir"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof fnf_data_1.WalkParaData !== "undefined" && fnf_data_1.WalkParaData) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof fnf_data_1.WalkData !== "undefined" && fnf_data_1.WalkData) === "function" ? _f : Object)
], FileActionController.prototype, "walkdir", null);
FileActionController = FileActionController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)("do"),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _g : Object])
], FileActionController);
exports.FileActionController = FileActionController;


/***/ }),

/***/ "./apps/api/src/app/file-action/file-action.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var FileActionGateway_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileActionGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const common_1 = __webpack_require__("@nestjs/common");
const file_service_1 = __webpack_require__("./apps/api/src/app/file-action/file.service.ts");
let FileActionGateway = FileActionGateway_1 = class FileActionGateway {
    constructor(fileService) {
        this.fileService = fileService;
        this.logger = new common_1.Logger(FileActionGateway_1.name);
    }
    onMultiDo(paras) {
        for (let i = 0; i < paras.length; i++) {
            const para = paras[i];
            this.logger.log("onMultiDo() cmd:" + para.cmd);
            let fn = this.fileService.getFunctionByCmd(para.cmd);
            try {
                fn(para)
                    .then(event => {
                    this.server.emit(fnf_data_1.ActionGatewayKeys.ON_MULTI_DO_DONE, event);
                });
            }
            catch (e) {
                this.server.emit(fnf_data_1.ActionGatewayKeys.ON_MULTI_DO_ERROR, para);
            }
        }
    }
};
(0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketServer)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], FileActionGateway.prototype, "server", void 0);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)(fnf_data_1.ActionGatewayKeys.MULTI_DO),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Array]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], FileActionGateway.prototype, "onMultiDo", null);
FileActionGateway = FileActionGateway_1 = (0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketGateway)(environment_1.environment.websocketPort, environment_1.environment.websocketOptions),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof file_service_1.FileService !== "undefined" && file_service_1.FileService) === "function" ? _b : Object])
], FileActionGateway);
exports.FileActionGateway = FileActionGateway;


/***/ }),

/***/ "./apps/api/src/app/file-action/file-action.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileActionModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const file_service_1 = __webpack_require__("./apps/api/src/app/file-action/file.service.ts");
const file_action_constroller_1 = __webpack_require__("./apps/api/src/app/file-action/file-action.constroller.ts");
const file_action_gateway_1 = __webpack_require__("./apps/api/src/app/file-action/file-action.gateway.ts");
let FileActionModule = class FileActionModule {
};
FileActionModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [
            file_action_constroller_1.FileActionController
        ],
        providers: [
            file_service_1.FileService,
            file_action_gateway_1.FileActionGateway
        ],
        exports: [
            file_action_gateway_1.FileActionGateway
        ]
    })
], FileActionModule);
exports.FileActionModule = FileActionModule;


/***/ }),

/***/ "./apps/api/src/app/file-action/file.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const copy_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/copy.fn.ts");
const move_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/move.fn.ts");
const mkdir_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/mkdir.fn.ts");
const remove_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/remove.fn.ts");
const rename_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/rename.fn.ts");
const open_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/open.fn.ts");
const unpack_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/unpack.fn.ts");
const dummy_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/common/dummy.fn.ts");
const unpack_list_fn_1 = __webpack_require__("./apps/api/src/app/file-action/action/unpack-list.fn.ts");
// import { unpacklist } from "./action/unpack-list.fn";
let FileService = class FileService {
    constructor() {
        this.copy = copy_fn_1.copy.bind(this); // Promise<DirEventIf[]>
        this.move = move_fn_1.move.bind(this); // Promise<DirEventIf[]>
        this.mkdir = mkdir_fn_1.mkdir.bind(this); // Promise<DirEventIf[]>
        this.remove = remove_fn_1.remove.bind(this); // Promise<DirEventIf[]>
        this.rename = rename_fn_1.rename.bind(this); // Promise<DirEventIf[]>
        this.open = open_fn_1.open.bind(this); // Promise<string>
        this.unpack = unpack_fn_1.unpack.bind(this); // Promise<number>
        this.unpacklist = unpack_list_fn_1.unpacklist.bind(this); // Promise<DirEventIf>
        this.dummy = dummy_fn_1.dummy.bind(this);
    }
    getFunctionByCmd(cmd) {
        if (cmd === "copy")
            return this.copy;
        if (cmd === "move")
            return this.move;
        if (cmd === "mkdir")
            return this.mkdir;
        if (cmd === "remove")
            return this.remove;
        if (cmd === "rename")
            return this.rename;
        if (cmd === "open")
            return this.open;
        if (cmd === "unpack")
            return this.unpack;
        if (cmd === "unpacklist")
            return this.unpacklist;
        return this.dummy;
    }
};
FileService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], FileService);
exports.FileService = FileService;


/***/ }),

/***/ "./apps/api/src/app/file-content/file.constroller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const fs_1 = __webpack_require__("fs");
const plain_body_1 = __webpack_require__("./apps/api/src/app/file-content/plain-body.ts");
let FileController = class FileController {
    // see http://localhost:3333/api/file?name=f:/leeching/_out/delete-empty.bat
    getFile(query) {
        const filename = query.name;
        return (0, fs_1.readFileSync)(filename, { encoding: "utf-8" });
    }
    // see https://stackoverflow.com/questions/52283713/how-do-i-pass-plain-text-as-my-request-body-using-nestjs
    saveFile(query, text) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const filename = query.name;
            (0, fs_1.writeFileSync)(filename, text, { encoding: "utf-8" });
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(""),
    (0, tslib_1.__param)(0, (0, common_1.Query)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", String)
], FileController.prototype, "getFile", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)(""),
    (0, tslib_1.__param)(0, (0, common_1.Query)()),
    (0, tslib_1.__param)(1, (0, plain_body_1.PlainBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object, String]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], FileController.prototype, "saveFile", null);
FileController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)("file")
], FileController);
exports.FileController = FileController;


/***/ }),

/***/ "./apps/api/src/app/file-content/file.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const file_constroller_1 = __webpack_require__("./apps/api/src/app/file-content/file.constroller.ts");
let FileModule = class FileModule {
};
FileModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [file_constroller_1.FileController],
        providers: []
    })
], FileModule);
exports.FileModule = FileModule;


/***/ }),

/***/ "./apps/api/src/app/file-content/plain-body.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlainBody = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const rawbody = __webpack_require__("raw-body");
exports.PlainBody = (0, common_1.createParamDecorator)((_, context) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const req = context.switchToHttp().getRequest();
    if (!req.readable) {
        throw new common_1.BadRequestException("Invalid body");
    }
    return (yield rawbody(req)).toString("utf8").trim();
}));


/***/ }),

/***/ "./apps/api/src/app/find/find.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs-extra");
const micromatch = __webpack_require__("micromatch");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const stats_to_file_1 = __webpack_require__("./apps/api/src/app/dir/stats-to-file.ts");
let FindGateway = class FindGateway {
    constructor() {
        this.cancellings = {};
    }
    find(findData) {
        const dirs = findData.findDialogData.folders ? findData.findDialogData.folders : [findData.findDialogData.folder];
        const allItems = [];
        let first = true;
        while (dirs.length) {
            if (this.cancellings[findData.emmitCancelKey]) {
                return;
            }
            const dir = dirs.pop();
            const items = [];
            const ffs = fs.readdirSync(dir);
            ffs.forEach(f => {
                const f2 = path.join(dir, f);
                const stats2 = fs.statSync(f2);
                if (stats2.isDirectory()) {
                    dirs.push(f2);
                }
                else {
                    const dir = path.dirname(f2);
                    const base = path.basename(f2);
                    if (micromatch.isMatch(path.join(dir, base), findData.findDialogData.pattern)) {
                        const ext = path.extname(f2);
                        const fileItem = new fnf_data_1.FileItem(dir, base, ext, null);
                        (0, stats_to_file_1.stats2FileItem)(stats2, fileItem);
                        fileItem.abs = true;
                        items.push(fileItem);
                        allItems.push(fileItem);
                    }
                }
            });
            if (items.length) {
                const dirEvent = new fnf_data_1.DirEvent(findData.dirTabKey, items, first, false, items.length, "", "list");
                this.server.emit(findData.emmitDataKey, dirEvent);
                console.info(dirEvent); // TODO del
                first = false;
            }
        }
        const dirEvent = new fnf_data_1.DirEvent(findData.dirTabKey, allItems, true, true, allItems.length, "", "list");
        this.server.emit(findData.emmitDataKey, dirEvent);
    }
    cancelFind(cancelId) {
        this.cancellings[cancelId] = cancelId;
    }
};
(0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketServer)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], FindGateway.prototype, "server", void 0);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("find"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof fnf_data_1.FindData !== "undefined" && fnf_data_1.FindData) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], FindGateway.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("cancelfind"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], FindGateway.prototype, "cancelFind", null);
FindGateway = (0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketGateway)(environment_1.environment.websocketPort, environment_1.environment.websocketOptions)
], FindGateway);
exports.FindGateway = FindGateway;


/***/ }),

/***/ "./apps/api/src/app/find/find.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const find_gateway_1 = __webpack_require__("./apps/api/src/app/find/find.gateway.ts");
let FindModule = class FindModule {
};
FindModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [
            find_gateway_1.FindGateway
        ],
        exports: [
            find_gateway_1.FindGateway
        ]
    })
], FindModule);
exports.FindModule = FindModule;


/***/ }),

/***/ "./apps/api/src/app/http-exception.filter.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpExceptionFilter = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        response
            .status(status)
            .json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        });
    }
};
HttpExceptionFilter = (0, tslib_1.__decorate)([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;


/***/ }),

/***/ "./apps/api/src/app/sysinfo/sysinfo.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SysinfoController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const sysinfo_service_1 = __webpack_require__("./apps/api/src/app/sysinfo/sysinfo.service.ts");
const rxjs_1 = __webpack_require__("rxjs");
let SysinfoController = class SysinfoController {
    constructor(sysinfoService) {
        this.sysinfoService = sysinfoService;
    }
    getData() {
        return this.sysinfoService.getData();
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)("sysinfo"),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_a = typeof rxjs_1.Observable !== "undefined" && rxjs_1.Observable) === "function" ? _a : Object)
], SysinfoController.prototype, "getData", null);
SysinfoController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof sysinfo_service_1.SysinfoService !== "undefined" && sysinfo_service_1.SysinfoService) === "function" ? _b : Object])
], SysinfoController);
exports.SysinfoController = SysinfoController;


/***/ }),

/***/ "./apps/api/src/app/sysinfo/sysinfo.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SysinfoModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const sysinfo_controller_1 = __webpack_require__("./apps/api/src/app/sysinfo/sysinfo.controller.ts");
const sysinfo_service_1 = __webpack_require__("./apps/api/src/app/sysinfo/sysinfo.service.ts");
let SysinfoModule = class SysinfoModule {
};
SysinfoModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [sysinfo_controller_1.SysinfoController],
        providers: [sysinfo_service_1.SysinfoService]
    })
], SysinfoModule);
exports.SysinfoModule = SysinfoModule;


/***/ }),

/***/ "./apps/api/src/app/sysinfo/sysinfo.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SysinfoService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const os = __webpack_require__("os");
const process = __webpack_require__("process");
const child_process_1 = __webpack_require__("child_process");
const rxjs_1 = __webpack_require__("rxjs");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const env = process.env;
let SysinfoService = class SysinfoService {
    /**
     *
     * @param cb  callback(error, {
                      type: 'Windows_NT',
                      platform: 'win32',
                      arch: 'x64',
                      linux: false,
                      osx: false,
                      windows: true,
                      smartMachine: false,
                      hostname: 'DEFRAWS123456',
                      username: 'krocon',
                      homedir: 'C:\\Users\\krocon',
                      tmpdir: 'C:\\Users\\krocon\\AppData\\Local\\Temp'
                  })
     * @returns {*}
     */
    getSystemInfo(cb) {
        if (this.systemInfo) {
            return cb(null, this.systemInfo);
        }
        const platform = os.platform();
        const ret = new fnf_data_1.Sysinfo();
        ret.type = os.type();
        ret.platform = platform;
        ret.arch = os.arch();
        ret.linux = platform.indexOf("linux") === 0;
        ret.osx = platform === "darwin";
        ret.windows = platform.indexOf("win") === 0;
        ret.smartMachine = platform === "sunos";
        ret.hostname = os.hostname();
        ret.username = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
        ret.homedir = os.homedir().replace(/\\/g, "/");
        ret.tmpdir = os.tmpdir().replace(/\\/g, "/");
        if (ret.username) {
            return cb(null, ret);
        }
        if (ret.osx || ret.linux) {
            (0, child_process_1.exec)("id -un", (err, stdout) => {
                ret.username = stdout.trim();
                this.systemInfo = ret;
                cb(err, ret);
            });
        }
        else if (ret.windows) {
            (0, child_process_1.exec)("whoami", { encoding: "utf8" }, (err, stdout) => {
                ret.username = stdout.trim().replace(/^.*\\/, ""); // xyz\user -> user
                this.systemInfo = ret;
                cb(err, ret);
            });
        }
        else {
            this.systemInfo = ret;
            cb(null, ret);
        }
    }
    getSystemInfoPromise() {
        return new Promise((resolve, reject) => {
            this.getSystemInfo((err, info) => {
                if (err) {
                    return reject(err);
                }
                resolve(info);
            });
        });
    }
    getData() {
        return (0, rxjs_1.from)(this.getSystemInfoPromise());
    }
};
SysinfoService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], SysinfoService);
exports.SysinfoService = SysinfoService;


/***/ }),

/***/ "./apps/api/src/app/walk/walk.gateway.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalkGateway = void 0;
const tslib_1 = __webpack_require__("tslib");
const websockets_1 = __webpack_require__("@nestjs/websockets");
const socket_io_1 = __webpack_require__("socket.io");
const path = __webpack_require__("path");
const fs = __webpack_require__("fs-extra");
const environment_1 = __webpack_require__("./apps/api/src/environments/environment.ts");
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
let WalkGateway = class WalkGateway {
    constructor() {
        this.cancellings = {};
    }
    walkdir(walkParaData) {
        const walkData = new fnf_data_1.WalkData();
        const stepsPerMessage = walkParaData.stepsPerMessage;
        const buf = [...walkParaData.files];
        let step = 0;
        while (buf.length) {
            if (this.cancellings[walkParaData.emmitCancelKey]) {
                return;
            }
            step++;
            const ff = buf.pop();
            const stats = fs.statSync(ff);
            if (stats.isDirectory()) {
                walkData.folderCount++;
                if (step % stepsPerMessage === 0) {
                    this.server.emit(walkParaData.emmitDataKey, walkData);
                }
                const ffs = fs.readdirSync(ff);
                ffs.forEach(f => buf.push(path.join(ff, f)));
            }
            else if (stats.isFile()) {
                walkData.fileCount++;
                walkData.sizeSum = walkData.sizeSum + stats.size;
                if (step % stepsPerMessage === 0) {
                    this.server.emit(walkParaData.emmitDataKey, walkData);
                }
            }
        }
        walkData.last = true;
        this.server.emit(walkParaData.emmitDataKey, walkData);
    }
    cancelWalk(cancelId) {
        this.cancellings[cancelId] = cancelId;
    }
};
(0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketServer)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], WalkGateway.prototype, "server", void 0);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("walkdir"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof fnf_data_1.WalkParaData !== "undefined" && fnf_data_1.WalkParaData) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], WalkGateway.prototype, "walkdir", null);
(0, tslib_1.__decorate)([
    (0, websockets_1.SubscribeMessage)("cancelwalk"),
    (0, tslib_1.__param)(0, (0, websockets_1.MessageBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String]),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], WalkGateway.prototype, "cancelWalk", null);
WalkGateway = (0, tslib_1.__decorate)([
    (0, websockets_1.WebSocketGateway)(environment_1.environment.websocketPort, environment_1.environment.websocketOptions)
], WalkGateway);
exports.WalkGateway = WalkGateway;


/***/ }),

/***/ "./apps/api/src/app/walk/walk.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalkModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const walk_gateway_1 = __webpack_require__("./apps/api/src/app/walk/walk.gateway.ts");
let WalkModule = class WalkModule {
};
WalkModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [],
        controllers: [],
        providers: [
            walk_gateway_1.WalkGateway
        ],
        exports: [
            walk_gateway_1.WalkGateway
        ]
    })
], WalkModule);
exports.WalkModule = WalkModule;


/***/ }),

/***/ "./apps/api/src/environments/environment.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.environment = void 0;
const frontendPort = 4200;
const websocketPort = 3334;
exports.environment = {
    production: false,
    frontendPort,
    websocketPort: websocketPort,
    websocketOptions: {
        cors: {
            origin: [
                'http://localhost:' + frontendPort,
                'http://localhost:' + process.env.PORT,
                'http://localhost:3333'
            ]
        }
    }
};


/***/ }),

/***/ "./libs/fnf-data/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRoot = exports.isSameDir = exports.getParent = void 0;
const tslib_1 = __webpack_require__("tslib");
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/customcss/css-colors.data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/demo/api-interfaces.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/emitable.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/system-meta-data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/cmd/button-enable-states.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/cmd/get-button-enable-states.fn.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/file-item.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/file-item.if.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/dir-event.if.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/dir-event.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/dir-para.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/vols-dir.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/dir/dir-watcher-event.type.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/walk/walk.data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/walk/walk.data.if.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/walk/walk-para.data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/file-cmd.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/file-para.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/do-event.if.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/do-event.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/action-gateway-cmd.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/do-event-2-dir-event.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/zip-matcher.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/fix-slash.fn.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/file/fix-path.fn.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/find/find-dialog.data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/find/find.data.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/find/search-symbol.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/sysinfo/sysinfo.if.ts"), exports);
(0, tslib_1.__exportStar)(__webpack_require__("./libs/fnf-data/src/lib/sysinfo/sysinfo.ts"), exports);
var get_parent_1 = __webpack_require__("./libs/fnf-data/src/lib/file/get-parent.ts");
Object.defineProperty(exports, "getParent", ({ enumerable: true, get: function () { return get_parent_1.getParent; } }));
var is_same_dir_1 = __webpack_require__("./libs/fnf-data/src/lib/file/is-same-dir.ts");
Object.defineProperty(exports, "isSameDir", ({ enumerable: true, get: function () { return is_same_dir_1.isSameDir; } }));
var is_root_1 = __webpack_require__("./libs/fnf-data/src/lib/file/is-root.ts");
Object.defineProperty(exports, "isRoot", ({ enumerable: true, get: function () { return is_root_1.isRoot; } }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/cmd/button-enable-states.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonEnableStates = void 0;
class ButtonEnableStates {
    constructor() {
        this.copy = false;
        this.edit = false;
        this.move = false;
        this.remove = false;
        this.mkdir = false;
        this.rename = false;
        this.unpack = false;
    }
}
exports.ButtonEnableStates = ButtonEnableStates;


/***/ }),

/***/ "./libs/fnf-data/src/lib/cmd/get-button-enable-states.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getButtonEnableStates = void 0;
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
function getButtonEnableStates(items) {
    var _a, _b, _c, _d, _e, _f;
    const states = new fnf_data_1.ButtonEnableStates();
    states.copy = !!(items === null || items === void 0 ? void 0 : items.length) && !((_a = items[0].dir) === null || _a === void 0 ? void 0 : _a.match(fnf_data_1.EXP_ZIP_FILE_URL));
    states.edit = (items === null || items === void 0 ? void 0 : items.length) === 1 && !((_b = items[0].dir) === null || _b === void 0 ? void 0 : _b.match(fnf_data_1.EXP_ZIP_FILE_URL));
    states.move = !!(items === null || items === void 0 ? void 0 : items.length) && !((_c = items[0].dir) === null || _c === void 0 ? void 0 : _c.match(fnf_data_1.EXP_ZIP_FILE_URL));
    states.remove = !!(items === null || items === void 0 ? void 0 : items.length) && !((_d = items[0].dir) === null || _d === void 0 ? void 0 : _d.match(fnf_data_1.EXP_ZIP_FILE_URL));
    states.mkdir = true;
    states.rename = (items === null || items === void 0 ? void 0 : items.length) === 1 && !((_e = items[0].dir) === null || _e === void 0 ? void 0 : _e.match(fnf_data_1.EXP_ZIP_FILE_URL));
    states.unpack = (items === null || items === void 0 ? void 0 : items.length) === 1 && !((_f = items[0].dir) === null || _f === void 0 ? void 0 : _f.match(fnf_data_1.EXP_ZIP_FILE_URL));
    return states;
}
exports.getButtonEnableStates = getButtonEnableStates;


/***/ }),

/***/ "./libs/fnf-data/src/lib/customcss/css-colors.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/demo/api-interfaces.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/dir-event.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/dir-event.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirEvent = void 0;
class DirEvent {
    constructor(dir, items = [], begin = false, end = false, size = 0, error = '', action = 'list', panelIndex = 0) {
        this.dir = dir;
        this.items = items;
        this.begin = begin;
        this.end = end;
        this.size = size;
        this.error = error;
        this.action = action;
        this.panelIndex = panelIndex;
    }
}
exports.DirEvent = DirEvent;


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/dir-para.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DirPara = void 0;
class DirPara {
    constructor(path, componentId = '', nocache = true) {
        this.path = path;
        this.componentId = componentId;
        this.nocache = nocache;
        this.rid = DirPara.RID++;
    }
}
exports.DirPara = DirPara;
DirPara.RID = 1000;


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/dir-watcher-event.type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/file-item.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/file-item.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FileItem = void 0;
class FileItem {
    constructor(dir, base = '', ext = '', date = '', error = '', size = 0, isDir = false, abs = false) {
        this.dir = dir;
        this.base = base;
        this.ext = ext;
        this.date = date;
        this.error = error;
        this.size = size;
        this.isDir = isDir;
        this.abs = abs;
    }
}
exports.FileItem = FileItem;


/***/ }),

/***/ "./libs/fnf-data/src/lib/dir/vols-dir.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VOLS_DIR = void 0;
exports.VOLS_DIR = "/fnf/vols";


/***/ }),

/***/ "./libs/fnf-data/src/lib/emitable.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/action-gateway-cmd.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActionGatewayKeys = void 0;
exports.ActionGatewayKeys = {
    MULTI_DO: 'multido',
    ON_MULTI_DO_DONE: 'done',
    ON_MULTI_DO_ERROR: 'error'
};


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/do-event-2-dir-event.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doEvent2DirEvent = void 0;
const fnf_data_1 = __webpack_require__("./libs/fnf-data/src/index.ts");
const doEvent2DirEvent = (doEvent) => {
    const ret = new fnf_data_1.DirEvent("");
    return [ret];
};
exports.doEvent2DirEvent = doEvent2DirEvent;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/do-event.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/do-event.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DoEvent = void 0;
class DoEvent {
    constructor(source, target, cmd, error = '', stdout = '', stderr = '') {
        this.source = source;
        this.target = target;
        this.cmd = cmd;
        this.error = error;
        this.stdout = stdout;
        this.stderr = stderr;
    }
}
exports.DoEvent = DoEvent;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/file-cmd.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/file-para.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilePara = void 0;
class FilePara {
    constructor(source, target, cmd = 'walk') {
        this.source = source;
        this.target = target;
        this.cmd = cmd;
    }
}
exports.FilePara = FilePara;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/fix-path.fn.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fixPath = void 0;
const fix_slash_fn_1 = __webpack_require__("./libs/fnf-data/src/lib/file/fix-slash.fn.ts");
function fixPath(s) {
    if (!s)
        return '';
    s = (0, fix_slash_fn_1.fixSlash)(s);
    if (s.length === 2 && s[1] === ':') {
        s = s + '/'; // c: -> c:/
    }
    return s;
}
exports.fixPath = fixPath;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/fix-slash.fn.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fixSlash = void 0;
function fixSlash(s) {
    if (!s)
        return '';
    return s
        .replace(/\\/g, "/")
        .replace(/\/\//g, "/");
}
exports.fixSlash = fixSlash;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/get-parent.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getParent = void 0;
const is_root_1 = __webpack_require__("./libs/fnf-data/src/lib/file/is-root.ts");
function getParent(url) {
    if ((0, is_root_1.isRoot)(url))
        return "";
    const arr = url.split("/");
    arr.length = arr.length - 1;
    return arr.join("/");
}
exports.getParent = getParent;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/is-root.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isRoot = void 0;
function isRoot(url) {
    if (url === "")
        return true;
    if (url === ".")
        return true;
    if (url === "./")
        return true;
    if (url === "/.")
        return true;
    if (url === "/")
        return true;
    if ((url.length === 2 || url.length === 3) && url[1] === ":")
        return true;
    return false;
}
exports.isRoot = isRoot;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/is-same-dir.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSameDir = void 0;
const is_root_1 = __webpack_require__("./libs/fnf-data/src/lib/file/is-root.ts");
function isSameDir(d1, d2) {
    if (d1 === d2)
        return true;
    if ((0, is_root_1.isRoot)(d1) && (0, is_root_1.isRoot)(d2))
        return true;
    if (d1
        .replace(/^[/.\\]/g, "")
        .replace(/[/.\\]$/g, "")
        .replace(/[/.\\]$/g, "")
        .replace(/\\/g, "/")
        .replace(/\/\//g, "/")
        .replace(/\/$/g, "")
        ===
            d2
                .replace(/^[/.\\]/g, "")
                .replace(/[/.\\]$/g, "")
                .replace(/\\/g, "/")
                .replace(/\/\//g, "/")
                .replace(/\/$/g, ""))
        return true;
    return false;
}
exports.isSameDir = isSameDir;


/***/ }),

/***/ "./libs/fnf-data/src/lib/file/zip-matcher.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ZipUrlInfo = exports.isZipBase = exports.isZipUrl = exports.getZipUrlInfo = exports.EXP_ZIP_FILE_BASE = exports.EXP_ZIP_FILE_URL = void 0;
exports.EXP_ZIP_FILE_URL = /([^:]+.\w{3}):(.*)/;
exports.EXP_ZIP_FILE_BASE = /^.*\.(zip|ZIP|rar|RAR)$/;
function getZipUrlInfo(url) {
    const matchArr = url.match(exports.EXP_ZIP_FILE_URL);
    if (matchArr) {
        return new ZipUrlInfo(matchArr[0], matchArr[1], matchArr[2]);
    }
    return new ZipUrlInfo("", "", "");
}
exports.getZipUrlInfo = getZipUrlInfo;
function isZipUrl(url) {
    return !!url.match(exports.EXP_ZIP_FILE_URL);
}
exports.isZipUrl = isZipUrl;
function isZipBase(url) {
    return !!url.match(exports.EXP_ZIP_FILE_BASE);
}
exports.isZipBase = isZipBase;
class ZipUrlInfo {
    constructor(fullUrl, zipUrl, zipInnerUrl) {
        this.fullUrl = fullUrl;
        this.zipUrl = zipUrl;
        this.zipInnerUrl = zipInnerUrl;
    }
}
exports.ZipUrlInfo = ZipUrlInfo;


/***/ }),

/***/ "./libs/fnf-data/src/lib/find/find-dialog.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindDialogData = void 0;
class FindDialogData {
    constructor(folder, pattern, newtab = true) {
        this.folder = folder;
        this.pattern = pattern;
        this.newtab = newtab;
    }
}
exports.FindDialogData = FindDialogData;


/***/ }),

/***/ "./libs/fnf-data/src/lib/find/find.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindData = void 0;
class FindData {
    constructor(emmitDataKey, emmitCancelKey, dirTabKey, findDialogData) {
        this.emmitDataKey = emmitDataKey;
        this.emmitCancelKey = emmitCancelKey;
        this.dirTabKey = dirTabKey;
        this.findDialogData = findDialogData;
    }
}
exports.FindData = FindData;


/***/ }),

/***/ "./libs/fnf-data/src/lib/find/search-symbol.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SEARCH_SYMBOL = void 0;
exports.SEARCH_SYMBOL = '🔎';


/***/ }),

/***/ "./libs/fnf-data/src/lib/sysinfo/sysinfo.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/sysinfo/sysinfo.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Sysinfo = void 0;
class Sysinfo {
    constructor() {
        this.type = '';
        this.platform = '';
        this.arch = '';
        this.linux = false;
        this.osx = false;
        this.windows = false;
        this.smartMachine = false;
        this.hostname = '';
        this.username = '';
        this.homedir = '';
        this.tmpdir = '';
    }
}
exports.Sysinfo = Sysinfo;


/***/ }),

/***/ "./libs/fnf-data/src/lib/system-meta-data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/walk/walk-para.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalkParaData = void 0;
class WalkParaData {
    constructor(files = [], emmitDataKey = '', emmitCancelKey = '', stepsPerMessage = 10) {
        this.files = files;
        this.emmitDataKey = emmitDataKey;
        this.emmitCancelKey = emmitCancelKey;
        this.stepsPerMessage = stepsPerMessage;
    }
}
exports.WalkParaData = WalkParaData;


/***/ }),

/***/ "./libs/fnf-data/src/lib/walk/walk.data.if.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/fnf-data/src/lib/walk/walk.data.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WalkData = void 0;
class WalkData {
    constructor(fileCount = 0, folderCount = 0, sizeSum = 0, last = false) {
        this.fileCount = fileCount;
        this.folderCount = folderCount;
        this.sizeSum = sizeSum;
        this.last = last;
    }
}
exports.WalkData = WalkData;


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/websockets":
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),

/***/ "chokidar":
/***/ ((module) => {

module.exports = require("chokidar");

/***/ }),

/***/ "fs-extra":
/***/ ((module) => {

module.exports = require("fs-extra");

/***/ }),

/***/ "micromatch":
/***/ ((module) => {

module.exports = require("micromatch");

/***/ }),

/***/ "node-stream-zip":
/***/ ((module) => {

module.exports = require("node-stream-zip");

/***/ }),

/***/ "raw-body":
/***/ ((module) => {

module.exports = require("raw-body");

/***/ }),

/***/ "rxjs":
/***/ ((module) => {

module.exports = require("rxjs");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "socket.io":
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "child_process":
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "os":
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "process":
/***/ ((module) => {

module.exports = require("process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
const app_service_1 = __webpack_require__("./apps/api/src/app/app.service.ts");
const http_exception_filter_1 = __webpack_require__("./apps/api/src/app/http-exception.filter.ts");
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        const globalPrefix = 'api';
        app.setGlobalPrefix(globalPrefix);
        app.enableCors();
        app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
        // app.useGlobalPipes(new ValidationPipe())
        const port = process.env.PORT || 3333;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
        });
        const server = app.getHttpServer();
        const router = server._events.request._router;
        const availableRoutes = router.stack
            .map(layer => {
            if (layer.route) {
                return {
                    path: layer.route.path,
                    method: layer.route.stack[0].method
                };
            }
        })
            .filter(item => item !== undefined);
        app_service_1.AppService.availableRoutes = availableRoutes;
        console.log('Routes:', availableRoutes);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map