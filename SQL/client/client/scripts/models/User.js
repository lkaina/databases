var User = Backbone.Model.extend({

  initialize: function(params) {
    this.set('username', params.username);
  }
});