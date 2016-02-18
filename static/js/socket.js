var rusha = new Rusha()
var socket = io()
var guid = localStorage.getItem('guid')

$('#register').submit(function () {
  var array = ['fname', 'lname', 'email', 'guser', 'password']
  for (i = 0; i < array.length; i++) {
    array[i] = $('#' + array[i]).val()
  }
  array[4] = rusha.digest(array[4] + '4e207681a07c9dccd1d1a3fc45566ff9ddde54ff')
  console.log('Register Hash: ' + array[4])
  socket.emit('register', array)
  document.getElementById('button').disabled = true
  toastr['info']('Just Checking It Again...', 'Looks Great!')
  return false
})

$('#login').submit(function () {
  var array = ['emaill', 'passwordl']
  for (i = 0; i < array.length; i++) {
    array[i] = $('#' + array[i]).val()
  }
  array[1] = rusha.digest(array[1] + '4e207681a07c9dccd1d1a3fc45566ff9ddde54ff')
  console.log('Login Hash: ' + array[1])
  socket.emit('login', array)
  document.getElementById('login').disabled = true
  toastr['info']('Back Shortly...', 'Verifying Details!')
  return false
})

socket.on('register success', function (msg) {
  function callback () {
    return function () {
      toastr['success']("You're Registered!", 'Success!')
    }
  }
  setTimeout(callback(), 2000)
})

socket.on('email exists', function (msg) {
  function callback () {
    return function () {
      toastr['error']('Email Already Exists :(', 'Error!')
      document.getElementById('button').disabled = false
    }
  }
  setTimeout(callback(), 1000)
})

socket.on('user', function (msg) {
  console.log('Data Received: ', msg)
})

socket.on('login failure', function (msg) {
  function callback () {
    return function () {
      toastr['error']("Those Details Aren't Right :(", 'Error!')
      document.getElementById('button').disabled = false
    }
  }
  setTimeout(callback(), 1000)
})

socket.on('login success', function (msg) {
  guid = msg
  localStorage.setItem('guid', msg)
  console.log('Updated Local Storage To: ' + localStorage.getItem('guid'))
  function callback () {
    return function () {
      toastr['success']("You're Logged In!", 'Success!')
    }
  }
  setTimeout(callback(), 2000)
})
