var express = require('express');
var cors = require('cors');
let bodyParser = require('body-parser')
let multer = require('multer');
let path = require('path')
let fs = require('fs')
require('dotenv').config()

var app = express();
let fileInfo =null;

const storage = multer.diskStorage({
  destination:(req,file,cb)=> {
    cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
    fileInfo={
      name:file.originalname,
      type:file.mimetype,
      size:file.size
    };
    console.log(file.mimetype)
    cb(null,file.originalname);
  }
})
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const upload = multer({storage:storage});

app.post("/api/fileanalyse",upload.single('upfile') ,(req,res)=> {
  fileInfo.size = fs.statSync(`./uploads/${fileInfo.name}`).size
  console.log(fileInfo)
  res.json(fileInfo)
})
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
