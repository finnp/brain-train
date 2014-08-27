var NeuralNetwork = require('brain').NeuralNetwork
var ldj = require('ldjson-stream')
var fs = require('fs')
var through = require('through2').obj
var tempfile = require('tempfile')()
var argv = require('minimist')(process.argv.slice(2))
// tmp,cnt
console.dir(argv)

process.stdin
  .pipe(ldj.parse())
  .pipe(through(function (data, enc, cb) {
    var dataio = {'input': {}, 'output': {}}
    
    if(argv.input) {
      var keys = argv.input.split(',')
      keys.forEach(function (key) {
        dataio['input'][key] = data[key]
      })
    } else {
      dataio['input'] = data['input']
    }
    
    if(argv.output) {
      var keys = argv.output.split(',')
      keys.forEach(function (key) {
        dataio['output'][key] = data[key]
      })
    } else {
      dataio['output'] = data['output']
    }  
    
    // console.log(data)
    cb(null, dataio)
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