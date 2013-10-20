/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
var mysql = require('mysql');

var sequelize = new Sequelize("chat2", "root", "");
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = sequelize.define('users', {
  name: { type: Sequelize.STRING, get: function() { return this.getDataValue(); } },
  rID: { type: Sequelize.INTEGER, get: function() { return this.getDataValue(); }, set: function(val) { return this.setDataValue('rID', val); } },
  id: { type: Sequelize.INTEGER, allowNull: false,  autoIncrement: true, primaryKey: true, get: function() { return this.getDataValue(); } }
});

var Room = sequelize.define('rooms', {
  name: {type: Sequelize.STRING,  get: function() { return this.getDataValue(); } },
  id: { type: Sequelize.INTEGER, allowNull: false,  autoIncrement: true, primaryKey: true,  get: function() { return this.getDataValue(); } }
});

var Message = sequelize.define('messages', {
  chatText: { type: Sequelize.STRING, get: function() { return this.getDataValue(); } },
  rID: { type: Sequelize.INTEGER, get: function() { return this.getDataValue(); } },
  uID: { type: Sequelize.INTEGER, get: function() { return this.getDataValue(); } },
  username: { type: Sequelize.STRING, get: function() { return this.getDataValue(); } },
  id: { type: Sequelize.INTEGER, allowNull: false,  autoIncrement: true, primaryKey: true, get: function() { return this.getDataValue(); } }
});

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
Room.sync().success(function() {
  var lobby = Room.build({name: 'lobby'});
  lobby.save();
});

Message.sync().success(function() {

});

User.sync().success(function() {
  var rID;
  /* This callback function is called once sync succeeds. */
  Room.find({ where: {name: 'lobby'} }).success(function(result) {
    rID = result.get('id');
    console.log('rID: '+rID);
  });
  // now instantiate an object and save it:
  var newUser = User.build({name: "Jean Valjean", rID: rID });
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {name: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].get('name') + " exists");
      }
    });
  });
});



