var socket = io()

function logout() {
  socket.emit('logout', localStorage.getItem('guid'))
  localStorage.setItem('guid', '')
  window.location.replace("/")
}

logout()