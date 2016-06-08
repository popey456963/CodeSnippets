var commander = function () {}
var logger = require('log-js')('LSTEN')
logger.changeLength(7)

commander.prototype.init = function (program, config, users, spawn) {
  program
    .version(config.programVersion)
    .option('-d, --dropusers', 'Drop users')
    .parse(process.argv)

  if (program.dropusers) {
    logger.log('Starting User Data Backup')
    var datadump = spawn('mongodump', ['--out', './backups', '--db', 'codesnippets'])
    datadump.on('close', function (code) {
      logger.log('Exit Code on Backup: ' + code)
      if (code == 0) {
        logger.success('Backup Appears Successful - Dropping Users')
        users.drop()
      } else {
        logger.error('Backup Appears UnSuccessful - Cancelling User Drop')
      }
    })
  }
}

module.exports = new commander()
