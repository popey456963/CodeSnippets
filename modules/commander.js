var commander = function () {}
var logger = require('./logger.js')
var l = 'INPUT'

commander.prototype.init = function (program, config, users, spawn) {
  program
    .version(config.programVersion)
    .option('-d, --dropusers', 'Drop users')
    .parse(process.argv)

  if (program.dropusers) {
    logger.log(l, 'Starting User Data Backup')
    var datadump = spawn('mongodump', ['--out', './backups', '--db', 'codesnippets'])
    datadump.on('close', function (code) {
      logger.log(l, 'Exit Code on Backup: ' + code)
      if (code == 0) {
        logger.success(l, 'Backup Appears Successful - Dropping Users')
        users.drop()
      } else {
        logger.error(l, 'Backup Appears UnSuccessful - Cancelling User Drop')
      }
    })
  }
}

module.exports = new commander()
