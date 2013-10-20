var Room = Backbone.Collection.extend({

  url: 'http://127.0.0.1:8080/messages',
  model: Message,

  initialize: function(params) {
    this.name = 'lobby';
    this.rID = params.rID;
    this.latest = 0;
    this.refreshMessages();
  },

  refreshMessages: function() {
    var that = this;
    setInterval(function() {
      var data = JSON.stringify({latest: that.latest, rID: that.rID});
      $.ajax({
        url: that.url,
        type: 'POST',
        data: data,
        contentType: 'application/json',
        success: function(data){
          console.log('Incoming Data: ',data);
          for (var i = 0; i < data.length; i++) {
            message = new Message(data[i]);
            that.add(message);
            that.latest = data[i].id;
          }
        },
        error: function(){
          console.log('error retrieving data');
        }

      });

    }, 2000);
  }

});