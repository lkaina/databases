/* Import node's http module: */
var http = require("http");
var requestHandler = require("./request-handler.js");
var url = require('url');


var requests = {};

//requests['/'] = requestHandler.indexView;
requests['/messages'] = requestHandler.chatRooms;
requests['/users'] = requestHandler.users;
requests['/rooms'] = requestHandler.changeRoom;

var requestListener = function (req, res) {
//  console.log("Serving request type " + req.method + " for url " + req.url);

  var basePath = url.parse(req.url).pathname;
  // console.log(basePath);
  if (requests[basePath]) {
    requests[basePath](req, res);
  } else {
    requestHandler.indexView(req, res);
//    sendResponse(res, 'Invalid route.', 404);
  }

};

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);