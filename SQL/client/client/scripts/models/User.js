var User = Backbone.Model.extend({

  initialize: function(params) {
    this.set('username', params.username);
    this.set('id', params.id);
    this.set('roomId', params.roomId);
  }
});