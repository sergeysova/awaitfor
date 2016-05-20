#!/usr/bin/env node

var axios = require('axios');
var notifier = require('node-notifier');
var Emitter = require('events');


var params = process.argv.slice(2)

var address = params[0];
var waitBefore = params[1] ? (Math.floor(Number(params[1])) * 1000) : 1;
var counter = 0;

if (!address) {
  console.error('Please, specify URL!')
  process.exit(1);
}

if (address == '-h' || address == '--help') {
  console.log('Await/For');
  console.log('Help:');
  console.log('  await <service_url> [seconds]');
  process.exit(0);
}

if (!isFinite(waitBefore) || waitBefore < 1 ) {
  console.error('Seconds must be integer')
  process.exit(1);
}

var checker = new Emitter();

checker.on('check', function() {
  axios.get(address)
  .then(function(){
    checker.emit('success');
  })
  .catch(function(error){
    checker.emit('fail');
  })
});

checker.on('fail', function() {
  counter++;
  console.log('#' + counter + '  Nothing...');

  setTimeout(function(){
    checker.emit('check')
  }, waitBefore);
});

checker.on('success', function(){
  console.log('--- Address '+ address +' is available!!! Notify');
  notifier.notify({
    title: 'Web service available!',
    message: address,
  });
  console.log('You wait ' + (waitBefore * counter) / 1000 + ' seconds')
});

console.log('Check address: ', address);
console.log('Wait ' + waitBefore / 1000 + ' seconds before try \n');

checker.emit('check');
