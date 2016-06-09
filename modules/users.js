var records = [
    { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'birthday', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
]

exports.findById = function(id, callback) {
  process.nextTick(function() {
    var idx = id - 1
    if (records[idx]) {
      callback(null, records[idx])
    } else {
      callback(new Error('User ' + id + ' does not exist'))
    }
  })
}

exports.findByUsername = function(username, callback) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i]
      if (record.username === username) {
        return callback(null, record)
      }
    }
    return callback(null, null)
  })
}
