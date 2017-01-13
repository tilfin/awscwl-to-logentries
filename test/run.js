const lambda = require('../functions/cwl-to-logentries');
const event = require('./record.json');

lambda.handle(event, {
  succeed: function() {
    console.log('succeed');
  },
  fail: function() {
    console.log('fail');
  }
}, function(err, result) {
  console.log('err:', err);
  console.log('result:', result);
});
