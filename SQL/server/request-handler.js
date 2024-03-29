var url = require('url');
var helpers = require('./helpers');
var sqlServer = require('./persistent_server.js');

// var _messages = [];
// //var idCounter = 0;

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.indexView = function(req, res) {
  helpers.serve(req, res);
};

exports.chatRooms = function(req, res) {
  switch (req.method) {
    // case 'GET':
    //   sqlServer.getMessages(req, res);
    //   break;
    case 'POST':
      helpers.collectData(req, function(data) {
        data = JSON.parse(data);
        if (data.hasOwnProperty('latest')) {
          sqlServer.getMessages(req, res, data);
        } else {
          sqlServer.postMessage(data, req, res);
        }
      });
      break;
    case 'OPTIONS':
      sendResponse(res, null, 'text/plain');
      break;
    default:
      console.log("what is happening", req.method);
      sendResponse(res, 'Uh oh', 'text/plain', 404);
  }
};

exports.users = function(req, res) {
  switch (req.method) {
    case 'GET':
      sqlServer.listUsers(res);
      break;
    case 'POST':
      helpers.collectData(req, function(name){
        sqlServer.addUser(name, res);
      });
      break;
  }
};

exports.changeRoom = function(req, res) {
  sqlServer.changeRoom(req, res);
};

exports.sendResponse = sendResponse = function(res, object, contentType, statusCode) {
  statusCode = statusCode || 200;
  contentType = contentType || 'application/json';
  object = (typeof object === 'string') ? object : JSON.stringify(object);
  headers["content-type"] = contentType;
  res.writeHead(statusCode, headers);
  res.end(object);
};