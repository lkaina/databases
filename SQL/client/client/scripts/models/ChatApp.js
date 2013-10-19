var ChatApp = Backbone.Model.extend({

  url : 'http://127.0.0.1:8080',

  initialize: function(params) {
    this.set('user', new User({ username: params.user, id: params.userId }));
    this.set('room', 'lobby');
    this.set('messagesList', new Room());
  },

  postNewMessageObject: function(newMessageText) {
    var user = this.get('user');
    var newMessageObject = {
      text: newMessageText,
      username: user.get('username'),
      userId: user.get('id'),
      roomId: user.get('roomId')
    };
    var message = new Message(newMessageObject);
    message.post();
  }

});