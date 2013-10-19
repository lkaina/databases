var ChatAppView = Backbone.View.extend({

  tagName: 'div',
  className: 'container',

  template: _.template($('#chatAppViewTemplate').html()),

  events: {
    'click #submitNewChatMessageText' : 'getNewMessageText'
  },

  initialize: function() {
  },

  render: function() {
    $('body').html(this.$el.html(this.template()));
    $('.chat-messages-field').html(new RoomView({ collection: this.model.get('messagesList') }).render() );
  },

  getNewMessageText: function(e) {
    e.preventDefault();
    var newMessageText = $('#newChatMessageText').val();
    $('#newChatMessageText').val("");
    this.model.postNewMessageObject(newMessageText);
  }

});