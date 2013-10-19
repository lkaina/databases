var path = require('path');
var fs = require('fs');
var requestHandler = require("./request-handler.js");

var validExtensions = {
  ".html" : "text/html",
  ".js" : "application/javascript",
  ".css" : "text/css",
  ".jpg" : "image/jpeg",
  ".gif" : "image/gif",
  ".png" : "image/png",
};

exports.serve = function(req, res){
  var pathname;
  if( req.url === "/" ){ pathname = "/index.html"; }
  else { pathname = req.url; }

  var ext = path.extname(pathname);
  var mimeType = validExtensions[ext];

  var fullpath = path.join(__dirname, '/public' + pathname);
  if (mimeType) {
    if(fs.existsSync(fullpath)){
      getFile(fullpath, res, mimeType);
    } else {
      sendReponse(res, 'Invalid extension', 404);
    }
  }
};

var getFile = function(path, res, mimeType) {
  fs.readFile(path, function(err,contents) {
    if (!err) {
      res.setHeader("Content-Length", contents.length);
      res.setHeader("Content-Type", mimeType);
      sendReponse(res, contents);
    } else {
      sendReponse(res, 'Cannot retrieve', 500);
    }
  });
};

exports.collectData = function(req, cb) {
  var data = "";
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    cb(data);
  });
};
