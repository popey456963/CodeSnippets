var bcrypt = require('bcrypt')
var password = '1c3fc486e0d567c0b294a740eae4a282f6bfc8e8'
bcrypt.hash(password, 10, function (err, hash) {
  console.log(hash)
  bcrypt.compare(password, '$2a$10$wHH5aV7GhJ8WwarURJ9h8Oql8oKwGB1PHDpm/rGQYXOhHl.ZTBgk.', function (err, ans) {
    console.log(err)
    console.log(ans)
  })
})
