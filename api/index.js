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

/* something complicated like booking a trip */
app.get('/api/trip/airline/reservation', function (req, res) {
  let currentDate = new Date()
  let futureFlight = new Date(currentDate.getFullYear(),
                              currentDate.getMonth() + 2,
                              currentDate.getDay(),
                              currentDate.getHours() + 3)

  const callback = () => {
    res.status(200)
    res.json({
      airline: 'JetBlue',
      flightCode: 'B6998',
      depart: 'Buffalo',
      departureTime: futureFlight
    })
  }
  setTimeout(callback, 5000)
})

app.get('/api/trip/hotel/reservation', function (req, res) {
  let currentDate = new Date()
  let arrivalDate = new Date(currentDate.getFullYear(),
                              currentDate.getMonth() + 4,
                              currentDate.getDay(),
                              3)

  let departureDate = new Date(currentDate.getFullYear(),
                              currentDate.getMonth() + 4,
                              currentDate.getDay() + 7,
                              3)
  const callback = () => {
    res.status(200)
    res.json({
      hotel: 'Marriot',
      arrive: arrivalDate,
      departure: departureDate
    })
  }
  setTimeout(callback, 2000)
})

app.get('/api/trip/airport/shuttle', function (req, res) {
  const callback = () => {
    res.status(200)
    res.json({
      message: 'Shuttle has been booked!'
    })
  }
  setTimeout(callback, 3000)
})

app.get('/api/trip/bicycle/rental', function (req, res) {
  const callback = () => {
    res.status(200)
    res.json({
      message: 'Bike rental has been booked!'
    })
  }
  setTimeout(callback, 3000)
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('example listening at http://%s:%s', host, port)
})
