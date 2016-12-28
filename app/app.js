'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _promise = require('promise');

var _promise2 = _interopRequireDefault(_promise);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HOME = _path2.default.resolve(__dirname);
var BASHSCRIPT = _path2.default.resolve(__dirname, '../bash/run.sh');

// const bashCall = spawn(BASHSCRIPT, ['first', 'path/to/image/temp.jpg']);
// bashCall.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

_dotenv2.default.config();
var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

var storage = _multer2.default.diskStorage({
    destination: function destination(req, file, cb) {
        cb(null, process.env.FILE_DIR);
    },
    filename: function filename(req, file, cb) {
        var extArray = file.mimetype.split("/");
        var extension = extArray[extArray.length - 1];
        var filename = Date.now().toString();
        var hash = _crypto2.default.createHash('sha1').update(filename).digest('hex');
        cb(null, hash + '.' + extension);
    }
});
var uploadMulter = (0, _multer2.default)({ storage: storage }).single('image');

app.post('/classify', uploadMulter, function (req, res) {
    //  res.status(200).json(req.file);
    // Fs.unlink(req.file.path); //remove file
    res.send('Done');
});

app.get('/', function (req, res) {
    res.send('Nothing to see here');
});

app.listen(process.env.SERVER_PORT, function () {
    console.log('Running server on port:', process.env.SERVER_PORT);
});
//# sourceMappingURL=app.js.map