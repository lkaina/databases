var mysql = require('mysql');
var requestHandler = require("./request-handler.js");

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  host: "http://127.0.0.1",
  port: '3306',
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

//** cache the lobby ID since all users start in lobby
var lobbyId;

dbConnection.query("SELECT id FROM rooms WHERE name = 'lobby';", function(err, result) {
  if (!err) {
    lobbyId = result.id;
  }
});

exports.getMessages = function(req, res) {
  
  sendResponse(res, FILL ME IN);
};

exports.postMessage = function(content, req, res) {
  var uID = content.userId;
  var rID = content.roomId;
  var userName = content.username;
  var text = content.text;
  var query = "INSERT INTO messages (uID, username, rID, chatText) VALUES(" + uID + ", " + userName + ", " + rID + ", '" + text + "');";
  dbConnection.query(query, function(err, result){
    sendResponse(res, 'Message accepted', 201);
  });
};

exports.changeRoom = function(req, res) {
  
};

exports.listUsers = function(res) {
  dbConnection.query("SELECT * FROM users", function(err, result) {
    sendResponse(res, result);
  });
};

exports.addUser = function(name, res) {
  dbConnection.query("SELECT * FROM users WHERE name = '" + name + "';", function(err, result) {
    if (!err) {
      if (result.length === 0) {
        dbConnection.query("INSERT INTO user (name, rID) VALUES('" + name + "', " + lobbyId + ");", function(err, result){
          sendResponse(res, {id: result.id, rID: lobbyId }, 201);
        });
      } else {
        sendResponse(res, {id: result.id, rID: results.rID}, 201); // user is returned to the room they logged out of
      }
    }
  });

};