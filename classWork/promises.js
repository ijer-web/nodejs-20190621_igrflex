const promise = new Promise((resolve, reject) => {
  setTimeout(function() {
    throw new Error('WOOPs');
  });
});
promise.then(function(result) {
  console.log('REsult', result);
}, function(err) {
  console.log('Cought', err.message);
});


