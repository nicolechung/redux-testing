let express = require('express')
let app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/api', function (req, res) {
  res.send('Hello World')
})

app.get('/api/passionfruit', function (req, res) {
  const callback = () => {
    res.status(200)
    res.json({
      lyric: `Passionate from miles away / Passive with the things you say / Passin' up on my old ways / I can't blame you no, no`
    })
  }
  setTimeout(callback, 500) // delay
})

app.get('/api/passionfruit/fail', function (req, res) {
  const callback = () => {
    res.status(500)
    res.error(`This api called has failed. On purpose`)
  }
  setTimeout(callback, 5000)
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('example listening at http://%s:%s', host, port)
})
