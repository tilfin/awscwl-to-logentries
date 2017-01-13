const bunyan = require('bunyan');


exports.handle = (event, context, callback) => {
  const log = bunyan.createLogger({
      name: 'myapp',
      stream: process.stdout,
      level: 'debug'
  });

  for (var i = 0; i < 3; i++) {
    log.debug({ data: { lv: 'debug', value:37 } }, 'Debug sample');
    log.info( { data: { lv: 'info' , value:38 } }, 'Info sample');
    log.error({ data: { lv: 'error', value:39 } }, 'Error sample');
  }

  context.succeed();
}
