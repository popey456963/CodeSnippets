var socket = io()

function is_logged_in() {
  socket.emit('test guid', localStorage.getItem('guid'), function(msg) {
  	if (msg) {
  		document.getElementById("is_logged_in").innerHTML = "You're logged in!"
  	} else {
  		document.getElementById("is_logged_in").innerHTML = "You're not logged in :("
  	}
  })
}

is_logged_in()