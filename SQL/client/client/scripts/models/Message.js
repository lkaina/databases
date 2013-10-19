var Message = Backbone.Model.extend({

  url: 'http://127.0.0.1:8080/messages',

  initialize: function(params) {
    this.set('username', params.username);
    this.set('userId', params.userId);
    this.set('roomId', params.roomId);
    this.set('text', params.text);
  },

  post: function() {
    this.save();
  }

});