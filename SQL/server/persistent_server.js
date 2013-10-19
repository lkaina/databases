var mysql = require('mysql');
var requestHandler = require("./request-handler.js");

/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  host: "localhost",
  port: '3306',
  user: "root",
  password: "",
  database: "chat"
});

dbConnection.connect();

//** cache the lobby ID since all users start in lobby
var lobbyId;

dbConnection.query("SELECT * FROM rooms WHERE name = 'lobby';", function(err, result) {
  if (!err) {
    lobbyId = result[0].id;
  }
});

exports.getMessages = function(req, res, content) {
  var latestID = content.latest;
  var rID = content.rID;
  var query = "SELECT * FROM messages WHERE rID = " + rID + " AND id > " + latestID + ";";
  dbConnection.query(query, function(err, result) {
    sendResponse(res, result);
  });

};

exports.postMessage = function(content, req, res) {
  console.log(content);
  var uID = content.uID;
  var rID = content.rID;
  var username = content.username;
  var chatText = content.chatText;
  var query = "INSERT INTO messages (uID, username, rID, chatText) VALUES (" + uID + ", '" + username + "', " + rID + ", '" + chatText + "');";
  dbConnection.query(query, function(err, result){
    if (err) { console.log(err);}
    sendResponse(res, 'Message accepted', 'application/json', 201);
  });
};

exports.changeRoom = function(req, res) {
  console.log('hello');
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
        dbConnection.query("INSERT INTO users (name, rID) VALUES ('" + name + "', " + lobbyId + ");", function(err, result){
          if(err){
            console.log('error in query ', err);
          }
          sendResponse(res, {id: result.insertId, rID: lobbyId }, 'application/json', 201);
        });
      } else {
        sendResponse(res, {id: result[0].id, rID: result[0].rID}, 'application/json', 201); // user is returned to the room they logged out of
      }
    }
  });

};