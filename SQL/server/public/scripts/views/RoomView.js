var RoomView = Backbone.View.extend({

  tagName: 'ul',
  className: 'chatroom',
  initialize: function() {
    this.collection.on('add', function() {
      console.log('Added: ', this.collection.models);
      this.render();
    }, this);
//    this.render();
  },

  render: function() {
    this.$el.html("");
    return this.$el.prepend(
      this.collection.map(function(message) {
        return new MessageView({model: message}).render();
      })
    );
  }
});