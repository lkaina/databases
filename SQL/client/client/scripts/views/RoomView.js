var RoomView = Backbone.View.extend({

  tagName: 'ul',
  className: 'chatroom',
  initialize: function() {
    this.collection.on('add', function() {
      this.render();
    }, this);
//    this.render();
  },

  render: function() {
    this.$el.html("");
    return this.$el.append(
      this.collection.map(function(message) {
        return new MessageView({model: message}).render();
      })
    );
  }
});