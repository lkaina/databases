var User = Backbone.Model.extend({

  initialize: function(params) {
    this.set('username', params.username);
    this.set('uID', params.uID);
    this.set('rID', params.rID);
  }
});