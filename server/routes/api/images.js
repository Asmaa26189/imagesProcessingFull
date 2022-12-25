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
// this is the main this end point used for resize  current images in full folder and put them with new size in thumb folder
// all imports used
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var imageResizing_1 = __importDefault(require("../../utilities/imageResizing"));
var image_size_1 = __importDefault(require("image-size"));
// router definition
var images = express_1.default.Router();
// all supported image format
var imagesFormat = ['jpg', 'png', 'gif'];
// default image format from to
var defaultFormFormat = 'jpg';
var defaultToFormat = 'jpg';
// acess it by /image?filename=&width=&height=&from=&to=
images.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var mainDir, dir, files, outDir, outFiles, fileName, width, height, widthQuery, heightQuery, imageFormFormat, imageToFormat, imageFlip, filePath, outputFilePath, imageOutName, dimensions;
    return __generator(this, function (_a) {
        // check that reponse completed true
        if (res.statusCode == 200) {
            mainDir = process.cwd();
            dir = './images/full';
            files = fs_1.default.readdirSync(dir);
            outDir = './images/thumb';
            outFiles = fs_1.default.readdirSync(outDir);
            fileName = req.query.filename;
            width = void 0;
            height = void 0;
            widthQuery = req.query.width;
            heightQuery = req.query.height;
            imageFormFormat = req.query.from;
            imageToFormat = req.query.to;
            imageFlip = req.query.flip;
            //check if format didn't send back to your default format (jpg)
            imageFormFormat = checkFromImageFormat(imageFormFormat, imagesFormat);
            imageToFormat = checkToImageFormat(imageToFormat, imagesFormat);
            // check if the target image allready exists in full folder or not
            if (files.includes(fileName + '.' + imageFormFormat)) {
                filePath = mainDir + '/images/full/' + fileName + '.' + imageFormFormat;
                // get width after check if exists or not
                width = checkQueryWidth(widthQuery, filePath, req.query.width);
                // get height after check if exists or not
                height = checkQueryHeight(heightQuery, filePath, req.query.height);
                // check that width and height are +ve
                if (width > 0 && height > 0) {
                    outputFilePath = ((mainDir +
                        '/images/thumb/' +
                        fileName +
                        'Procssed_' +
                        width) +
                        '_' +
                        height) +
                        '.' +
                        imageToFormat;
                    imageOutName = ((fileName + 'Procssed_' + width) +
                        '_' +
                        height) +
                        '.' +
                        imageToFormat;
                    // check if the image is allready processed before or not
                    if (outFiles.includes(imageOutName)) {
                        dimensions = (0, image_size_1.default)(outputFilePath);
                        // check is it the same image with same size is not exist
                        if (dimensions.width != width || dimensions.height != height) {
                            // check if user needs to flip image or not
                            if (imageFlip == undefined && imageFlip != 'true') {
                                // resize target image with sharp
                                imageResizing_1.default.convertImageSize(filePath, width, height, outputFilePath, res);
                            }
                            else {
                                //if user need to flip image
                                // resize target image with sharp
                                imageResizing_1.default.convertImageSizeWithFlip(filePath, width, height, outputFilePath, res);
                            }
                        }
                        else {
                            // if image is allready exists get it directly from folder and show it
                            console.log('Cached');
                            res.sendFile(outputFilePath);
                        }
                    }
                    else {
                        // resize target image with sharp
                        // check if user needs to flip image or not
                        if (imageFlip == undefined && imageFlip != 'true') {
                            imageResizing_1.default.convertImageSize(filePath, width, height, outputFilePath, res);
                        } // if user need to flip image
                        else {
                            imageResizing_1.default.convertImageSizeWithFlip(filePath, width, height, outputFilePath, res);
                        }
                    }
                }
                else {
                    // if user sends negative or zero in width/ height
                    res.send('<div style="text-align:center;"><h1>You have (-ve/0/Not Number) value (width/height) please check it  </h1></div>');
                }
            }
            else {
                // if targat image not exist in full folder
                res.send('<div style="text-align:center;"><h1>File Not Found </h1></div>');
            }
        }
        else {
            res.send('<div style="text-align:center;"><h1>API Error </h1></div>');
        }
        return [2 /*return*/];
    });
}); });
//// functions//////
// to check Form image format exists or not
var checkFromImageFormat = function (imageFormFormat, imagesFormat) {
    var imageFormat = imageFormFormat;
    // if image format doesnot exists return default one
    if (imageFormFormat == undefined ||
        imageFormFormat == null ||
        !imagesFormat.includes(imageFormFormat.toLowerCase()))
        imageFormat = defaultFormFormat.toLowerCase();
    return imageFormat;
};
// to check Form image format exists or not
var checkToImageFormat = function (imageToFormat, imagesFormat) {
    var imageFormat = imageToFormat;
    // if image format doesnot exists return default one
    if (imageToFormat == undefined ||
        imageToFormat == null ||
        !imagesFormat.includes(imageToFormat.toLowerCase()))
        imageFormat = defaultToFormat.toLowerCase();
    return imageFormat;
};
// check width sends in query string or not
var checkQueryWidth = function (widthQuery, filePath, reqQueryWidth) {
    var width;
    // if it doesn't exist get the default width
    if (widthQuery == undefined)
        width = (0, image_size_1.default)(filePath).width;
    else
        width = parseInt(reqQueryWidth);
    return width;
};
// check height sends in query string or not
var checkQueryHeight = function (heightQuery, filePath, reqQueryHeight) {
    var height;
    // if it doesn't exist get the default height
    if (heightQuery == undefined)
        height = (0, image_size_1.default)(filePath).height;
    else
        height = parseInt(reqQueryHeight);
    return height;
};
// Export router to use it in any import
exports.default = images;
