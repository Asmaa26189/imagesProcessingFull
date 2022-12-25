"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// main index
// all imports used
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var images_1 = __importDefault(require("./routes/api/images"));
var logger_1 = __importDefault(require("./middleware/logger"));
// define express
var app = (0, express_1.default)();
//define port
var port = 3000;
// app use some routers
app.use('/api', index_1.default);
app.use('/images', images_1.default);
// main page and first accessed one
app.get('/', logger_1.default, function (req, res) {
    // define link
    var href = '<a href="/images?filename=img1&width=200&height=700">Go To Image Resizing Example</a><br/>';
    var htmlData = ('<div style="text-align:center;"><h1>Mai Page</h1><br/>' +
        href +
        '<h3>current images names in full path (img1,img2,img3,img4)</h3>' +
        '</div>');
    // send html simple interface
    res.send(htmlData);
});
// app listen to defined port
app.listen(port, function () {
    // first run after server start
    console.log('Server Started');
});
// Export express to use it in any import
exports.default = app;
