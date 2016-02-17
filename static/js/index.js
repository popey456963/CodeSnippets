$('.form').find('input, textarea').on('keyup blur focus', function (e) {
  var $this = $(this),
    label = $this.prev('label')

  if (e.type === 'keyup') {
    if ($this.val() === '') {
      label.removeClass('active highlight')
    } else {
      label.addClass('active highlight')
    }
  } else if (e.type === 'blur') {
    if ($this.val() === '') {
      label.removeClass('active highlight')
    } else {
      label.removeClass('highlight')
    }
  } else if (e.type === 'focus') {
    if ($this.val() === '') {
      label.removeClass('highlight')
    }
    else if ($this.val() !== '') {
      label.addClass('highlight')
    }
  }

})

$('.tab a').on('click', function (e) {
  e.preventDefault()

  $(this).parent().addClass('active')
  $(this).parent().siblings().removeClass('active')

  target = $(this).attr('href')

  $('.tab-content > div').not(target).hide()

  $(target).fadeIn(600)

})

toastr.options = {
  'closeButton': true,
  'debug': false,
  'newestOnTop': false,
  'progressBar': false,
  'positionClass': 'toast-top-right',
  'preventDuplicates': false,
  'onclick': null,
  'showDuration': '300',
  'hideDuration': '1000',
  'timeOut': '5000',
  'extendedTimeOut': '1000',
  'showEasing': 'swing',
  'hideEasing': 'linear',
  'showMethod': 'fadeIn',
  'hideMethod': 'fadeOut'
}

function getParameterByName (name, url) {
  if (!url) url = window.location.href
  name = name.replace(/[\[\]]/g, '\\$&')
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

if (getParameterByName('debug') == '1') {
  document.getElementById('fname').value = 'Popey'
  document.getElementById('lname').value = 'Gilbert'
  document.getElementById('email').value = 'Popey@Gilbert.com'
  document.getElementById('guser').value = 'popey456963'
  document.getElementById('password').value = 'Password123'
  document.getElementById('emaill').value = 'Popey@Gilbert.com'
  document.getElementById('passwordl').value = 'Password123'

}

var rusha = new Rusha()
var socket = io()
$('#register').submit(function () {
  var array = ['fname', 'lname', 'email', 'guser', 'password']
  for (i = 0; i < array.length; i++) {
    array[i] = $('#' + array[i]).val()
  }
  // array[4] = rusha.digest(array[4] + '4e207681a07c9dccd1d1a3fc45566ff9ddde54ff')
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
  // array[1] = rusha.digest(array[1] + '4e207681a07c9dccd1d1a3fc45566ff9ddde54ff')
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
