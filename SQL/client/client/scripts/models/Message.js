var Message = Backbone.Model.extend({

  url: 'http://127.0.0.1:8080/messages',

  initialize: function(params) {
    this.set('username', params.username);
    this.set('roomname', params.roomname);
    this.set('text', params.text);
    this.set('createdAt', params.createdAt);
  },

  post: function() {
    this.save();
    this.trigger('updated');
  }

});