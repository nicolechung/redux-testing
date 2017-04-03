let express = require('express')
let app = express()

app.get('/api', function (req, res) {
  res.send('Hello World')
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('example listening at http://%s:%s', host, port)
})