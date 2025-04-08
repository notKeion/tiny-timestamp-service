// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// https://3000-freecodecam-boilerplate-t68jqawnx2u.ws-us118.gitpod.io/api/1451001600000

app.get('/api', function (req,res){
  let date = new Date()

  res.send({unix: date.valueOf(), utc: date.toUTCString()})

})
app.get('/api/:date?', function (req, res) {
  let d = req.params.date;
  let date;

  // Check if it's a number string (unix timestamp)
  if (!isNaN(d)) {
    date = new Date(parseInt(d));
  } else {
    date = new Date(d);
  }

  if (isNaN(date.getTime())) {
    res.send({ error: "Invalid Date" });
    return;
  }

  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
