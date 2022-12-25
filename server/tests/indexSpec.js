"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// unit test with jasmine super test
// all imports used
var index_1 = __importDefault(require("../index"));
var supertest_1 = __importDefault(require("supertest"));
var imageResizing_1 = __importDefault(require("../utilities/imageResizing"));
var request = (0, supertest_1.default)(index_1.default);
// test start page
describe('Test main', function () {
    it('Start page', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test Resize image', function () {
    // test image with well defined name, width and height
    it('image fjord ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img1&width=900&height=500')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image with -ve values in width and height
    it('image -ve width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img2&width=-700&height=-100')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('text/html');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image with empty file name
    it('empty image name', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=&width=-700&height=-100')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('text/html');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test float image width and height
    it('float width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img1&width=700.9999&height=100.88888')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image without width
    it('test image without width ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img2&height=800')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image without height
    it('test image without height ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img1&width=800')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image without height and width
    it('test image without width and height ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img2')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test format form to
    it('format form to ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img1&width=200&height=700&from=jpg&to=Gif')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/gif');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image link without parameters
    it('image without parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('text/html');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // test image fliped
    it('image fliped ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/images?filename=img2&width=200&height=700&flip=true')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.type).toBe('image/jpeg');
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('Test api', function () {
    // test /api
    it('api', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request.get('/api')];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.notFound).toBeFalsy();
                    expect(response.forbidden).toBeFalsy();
                    expect(response.notAcceptable).toBeFalsy();
                    expect(response.ok).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
var mainDir = process.cwd();
var fileName = 'img1';
var width = 100;
var height = 100;
var imageToFormat = '.jpg';
var imageFormFormat = '.jpg';
var outputFilePath = ((mainDir + '/images/thumb/' + fileName + 'Procssed_' + width) +
    '_' +
    height) +
    '.' +
    imageToFormat;
var filePath = mainDir + '/images/full/' + fileName + '.' + imageFormFormat;
describe('image processing function', function () {
    it('resize', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // test image processing
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, imageResizing_1.default.convertImageSize(filePath, width, height, outputFilePath)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
    it('resize with flip', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // test image processing
            expect(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, imageResizing_1.default.convertImageSizeWithFlip(filePath, width, height, outputFilePath)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }).not.toThrow();
            return [2 /*return*/];
        });
    }); });
});
