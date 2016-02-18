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

if (getParameterByName('local') == '1') {
  localStorage.setItem('guid', '')
}
