
// Get dependencies
import * as express from "express"
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const DIR = './upload';
let multer = require('multer');
let upload = multer({dest: DIR}).single('photo');
let fs = require('fs');
let unirest=require("unirest");
let PythonShell = require('python-shell');
let cors = require('cors');



const app = express();
app.use(cors());



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'babylon_game')));
app.use(express.static(path.join(__dirname, 'python')));

app.use(function(req, res, next) {
//set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, './babylon_game/index.html'));
});



// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});



app.post('/upload/', function (req, res, next) {
  let path = "";
  upload(req, res, function (err) {
    if (err) {
      // An error occurred when uploading
      console.log(err);
      return res.status(422).send("an Error occured")
    }


    fs.renameSync(__dirname+'/upload/'+req.file.filename, __dirname+'/upload/'+req.file.originalname);
    path = req.file.path;
    let name=req.file.originalname;
    console.log(req.file.originalname+" UPLOADED");

    let options={
      args:[name]
    };
    PythonShell.run('./python/script.py', options,function (err, results) {
      if (err) throw err;
      console.log('results: %j', results);
      return res.send("Upload Completed for "+path);
    });

  });
});
app.post('/upload/articleMain', function(req,res){

  let text=JSON.stringify(req.body).split("}}},");
  console.log(text[1]);
  let obj;
  fs.readFile(__dirname+'/src/app/page-main/mainArticles.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    obj.articles.push("{"+text[1]);
    let stringified=JSON.stringify(obj);
    stringified=stringified.split('\\').join("");
    stringified=stringified.replace('"{','{');
    stringified=stringified.replace('}"','}');


    fs.writeFileSync(__dirname+'/src/app/page-main/mainArticles.json', stringified, (err) => {
      if (err) throw err;
      console.log('appended to file mainArticles.json!');
    });
  });

});
app.post('/upload/articleEgyeb', function(req,res) {

  let text = JSON.stringify(req.body).split("}}},");
  let obj;
  fs.readFile(__dirname + '/src/app/page-rolam/egyebArticles.json', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
    obj.articles.push("{" + text[1]);
    let stringified=JSON.stringify(obj);
    stringified=stringified.split('\\').join("");
    stringified=stringified.replace('"{','{');
    stringified=stringified.replace('}"','}');
    fs.writeFileSync(__dirname + '/src/app/page-rolam/egyebArticles.json', stringified, (err) => {
      if (err) throw err;
      console.log('appended to file egyebArticles.json!');
    });
  });
});
  /**
   * Get port from environment and store in Express.
   */
  const port = process.env.PORT || '3000';
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port, () => console.log(`Server running on localhost:${port}`));
