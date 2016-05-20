#!/usr/bin/env node

var axios = require('axios');
var notifier = require('node-notifier');
var Emitter = require('events');


var params = process.argv.slice(2)

var address = params[0];
var counter = 0;

if (!address) {
  console.error('Please, specify URL!')
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
  }, 1000);
});

checker.on('success', function(){
  console.log('--- Address '+ address +' is available!!! Notify');
  notifier.notify({
    title: 'Web service available!',
    message: address,
  });
});

console.log('Check address: ', address);

checker.emit('check');
