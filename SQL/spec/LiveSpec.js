/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
    /* TODO: Fill this out with your mysql username */
      user: "root",
    /* and password. */
      password: "",
      database: "chat"
    });
    dbConnection.connect();

    var tablename = "messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("DELETE FROM " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:8080/room1",
             form: {username: "Valjean",
                    message: "In mercy's name, three days is all I need."}
            },
            function(error, response, body) {
              /* Now if we look in the database, we should find the
               * posted message there. */

              var queryString = "SELECT * FROM messages WHERE username = '"+ queryArgs[1] +"';";
              var queryArgs = [form.username, form.message];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString, queryArgs,
                function(err, results, fields) {
                  var name = results[0].name;
                  dbConnection.query("SELECT name FROM users WHERE id = '" + results[0].uID + "';", function(err, results, fields) {
                    // Should have one result:
                    expect(results.length).toEqual(1);
                    expect(name).toEqual("Valjean");
                    expect(results[0].chatText).toEqual("In mercy's name, three days is all I need.");
                    done();
                  });
                  done();
                });
              });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    dbConnection.query( "INSERT INTO messages (name,  chatText) VALUES('Javert', 'Men like you can never change!');");
    dbConnection.query( "SELECT id, rID FROM users WHERE name = 'Javert';",);
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:8080/classes/room1",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(name).toEqual("Javert");
            expect(results[0].chatText).toEqual("Men like you can never change!");
            done();
          });
      });
  });

    var queryString = "INSERT INTO messages (chatText, uID, rID) VALUES('" + queryArgs[1] + "'', '" +  + "'', '" +  + "'');";
    var queryArgs = ["Javert", "Men like you can never change!"];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:8080/classes/room1",
          function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].message).toEqual("Men like you can never change!");
            done();
          });
      });
  });
});
