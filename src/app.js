'use strict';
import Express from 'express';
import Dotenv from 'dotenv';
import BodyParser from 'body-parser';
import Crypto from 'crypto';
import Multer from 'multer';
import Promise from 'promise';
import Fs from 'fs';
import Path from 'path';
import {spawn} from 'child_process';

const HOME = Path.resolve(__dirname);
const BASHSCRIPT = Path.resolve(__dirname,'../bash/run.sh');

// const bashCall = spawn(BASHSCRIPT, ['first', 'path/to/image/temp.jpg']);
// bashCall.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`);
// });

Dotenv.config();
let app = Express();
app.use(BodyParser.urlencoded({extended: true})); 
app.use(BodyParser.json());

let storage = Multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, process.env.FILE_DIR);
    },
    filename: (req, file, cb) =>{
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        let filename = Date.now().toString();
        let hash = Crypto.createHash('sha1').update(filename).digest('hex');
        cb(null, hash + '.' + extension);
    }
});
let uploadMulter = Multer({storage:storage}).single('image');

app.post('/classify', uploadMulter, (req, res) =>{
  //  res.status(200).json(req.file);
   // Fs.unlink(req.file.path); //remove file
   res.send('Done')
});

app.get('/', (req, res) => {
    res.send('Nothing to see here')
});

app.listen(process.env.SERVER_PORT,()=>{
    console.log('Running server on port:', process.env.SERVER_PORT);
});

