// const fs = require('fs');
// fs.readFile('./test.html', function (err, data){
//   if (err) throw err;
//   console.log(data);
//   fs.readFile('./test1.js', function (err, data){
//     if (err) throw err;
//     console.log('data1: ' + data);
//     fs.readFile('./test2.js', function (err, data){
//       if (err) throw err;
//       console.log('data2: ' + data);
//     })
//   })
// })
var readFile = require('fs-readfile-promise');

readFile('test.html')
.then(function(data){
  console.log(data.toString())
})
.then(function () {
  return readFile('test1.js')
})
.then(function (data) {
  console.log(data.toString());
})
.caatch(function (err) {
  console.log(err)
})