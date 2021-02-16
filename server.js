// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204
app.use(bodyParser.json());
// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/timestamp/:someVal?", function (req, res) {
  let val = req.params.someVal;
  if(!val){
    let unix=new Date().getTime()
    let utc=new Date().toUTCString()
    return res.json({ unix, utc });
  }
  if (!(/\d{4,}/.test(val))) {
    return res.json({error:"Invalid Date"})
  }
  let IsNanVal = isNaN(val);
  const isValidDate = (param, paramVal) => {
    if (param) {
      return new Date(paramVal).getTime();
    }
    return Number(paramVal);
  };
  const validateUtc = (param, paramVal) => {
    if (param) {
      return new Date(paramVal).toUTCString();
    }
    return new Date(Number(paramVal)).toUTCString();
  };
  let unix = isValidDate(IsNanVal, val);
  let utc = validateUtc(IsNanVal, val);
  res.json({ unix, utc: utc });
});
// listen for requests :)
const PORT = process.env.PORT || 5000;
var listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
