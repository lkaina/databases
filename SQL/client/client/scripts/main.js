$(document).ready(function() {
  getUserInfo();
});

var getUserInfo = function() {
  $('.user-input-modal').fadeIn(300);

  $('#submitUserName').on('click', function(e) {
    e.preventDefault();
    var username = $('#getUserName').val();
    if (username === "") {
      username = "Anonymous";
    }
    $.ajax({
      url: '/users',
      type: 'POST',
      contentType: 'text/plain',
      data: username,
      success: function(data) {
        data = JSON.parse(data);
        startApp(username, data);
      }
    });
  });
};

var startApp = function(username, data){

  var chatApp = new ChatApp({ user: username, userId: data.id, roomId: data.rID });
  var chatAppView = new ChatAppView({model: chatApp});
  chatAppView.render();
};

