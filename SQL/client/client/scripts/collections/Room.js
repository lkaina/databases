var Room = Backbone.Collection.extend({

  url: 'http://127.0.0.1:8080/messages',
  model: Message,

  initialize: function(params) {
    this.name = 'lobby';
    this.refreshMessages();
  },

  refreshMessages: function() {
    var that = this;

    setInterval(function() {
      that.fetch();
      console.log(that.length);
    }, 1000);
  }

});