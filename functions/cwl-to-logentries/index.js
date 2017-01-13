'use strict';

const zlib = require('zlib');
const through2 = require('through2');
const Logger = require('le_node');
const KSL = require('kinesis-stream-lambda');
const PromisedLife = require('promised-lifestream');


exports.handle = (event, context, callback) => {
  const logger = new Logger({ token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' });
  const procStream = through2.obj(
    function(data, enc, cb) {
      data.logEvents.forEach(logevt => {
        logger.log(logevt.message);
      });
      this.push();
      cb();
    });

  PromisedLife([
    KSL.reader(event),
    through2(function (chunk, enc, cb) {
      zlib.gunzip(chunk, cb);
    }),
    KSL.parseJSON(),
    procStream
  ])
  .then(() => {
    return [null, null];
  })
  .catch(err => {
    logger.error(err);
    return [err, null];
  })
  .then(args => {
    logger.end();
    setTimeout(() => {
      logger.closeConnection();
      callback.apply(this, args);
    }, 800);
  });
}
