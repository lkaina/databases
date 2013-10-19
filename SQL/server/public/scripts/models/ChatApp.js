var ChatApp = Backbone.Model.extend({

  url : 'http://127.0.0.1:8080',

  initialize: function(params) {
    this.set('username', new User({ username: params.username, uID: params.uID, rID: params.rID }));
    this.set('room', 'lobby');
    this.set('messagesList', new Room({ rID: this.get('username').get('rID') }));
  },

  postNewMessageObject: function(newMessageText) {
    var username = this.get('username');
    var newMessageObject = {
      chatText: newMessageText,
      username: username.get('username'),
      uID: username.get('uID'),
      rID: username.get('rID')
    };
    var message = new Message(newMessageObject);
    message.post();
  }

});