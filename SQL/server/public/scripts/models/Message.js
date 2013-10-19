var Message = Backbone.Model.extend({

  url: 'http://127.0.0.1:8080/messages',

  initialize: function(params) {
    this.set('username', params.username);
    this.set('uID', params.uID);
    this.set('rID', params.rID);
    this.set('chatText', params.chatText);
  },

  post: function() {
    this.save();
  }

});