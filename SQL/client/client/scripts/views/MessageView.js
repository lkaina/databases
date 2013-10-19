var MessageView = Backbone.View.extend({

  tagName: 'li',

  template: _.template('<p><%= username %></p><p><%= text %></p>'),

  render: function() {
    return this.$el.html(this.template(this.model.attributes));
  }

});