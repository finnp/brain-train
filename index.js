var NeuralNetwork = require('brain').NeuralNetwork
var ldj = require('ldjson-stream')
var fs = require('fs')
var through = require('through2').obj
var tempfile = require('tempfile')()
// tmp,cnt
console.log(tempfile)

process.stdin
  .pipe(ldj.parse())
  .pipe(through(function (data, enc, cb) {
    var data = {
      input: {
        temp: Number(data.temp)
      },
      output: {
        cnt: (Number(data.cnt) / 5000)
      }
    }
    // console.log(data)
    cb(null, data)
  }))
  .pipe(ldj.serialize())
  .pipe(fs.createWriteStream(tempfile))
  .on('finish', startTrain)

function startTrain() {
  var net = new NeuralNetwork({learningRate: 0.6})
  var train = net.createTrainStream({
    floodCallback: function () {
      writeToStream()
    },
    doneTrainingCallback: function (info) {
     console.error(info)
     console.error(net.run({temp: 0}))
     console.error(net.run({temp: 0.6}))
     console.log(JSON.stringify(net.toJSON()))
    },
    log: true,
    iterations: 1000
  })
  //kickoff
  writeToStream()
  
  function writeToStream() {
    fs.createReadStream(tempfile).pipe(ldj.parse()).on('data', function (chunk) {
      train.write(chunk)
    }).on('end', function () {
      train.write(null)
    })    
  }

}