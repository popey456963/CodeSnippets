var socket = io();
$('form').submit(function(){
  socket.emit('button press', $('#m').val());
  $('#m').val('');
  return false;
});

socket.on('user', function(msg){
  console.log("Data Received: ", msg);
});

function is_logged_in(callback) {
  socket.emit('test guid', localStorage.getItem('guid'), function(msg) {
    callback(msg)
  })
}

function logout() {
  window.location.replace('/logout')
}

function login() {
  window.location.replace('/login')
}

/*
is_logged_in(function(logged_in) {
  if (logged_in) {
    document.getElementById('logout').style.display =  ""
    $("#name").text("logged in as " + logged_in)
  } else {
    document.getElementById('login').style.display =  ""
  }
})
*/