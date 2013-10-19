var ChatApp = Backbone.Model.extend({

  url : 'http://127.0.0.1:8080',

  initialize: function(params) {
    this.set('user', new User({ username: params.user}));
    this.set('room', 'lobby');
    this.set('messagesList', new Room());
  },

  postNewMessageObject: function(newMessageText) {
    var newMessageObject = {
      text: newMessageText,
      username: this.get('user').get('username'),
      roomname: this.get('room'),
      createdAt: new Date()
    };
    var message = new Message(newMessageObject);
    message.post();
  }

});