'use strict';

var alexa = require("alexa-app");
var app = new alexa.app("clock-hand-angle");

app.post = function(request, response, type, exception) {
  if (exception) {
    console.error("An error occured: " + exception);
    response.clear().say("An error occured. Please try again later.");
  }
};

app.intent("ClockHandAngle", {
    "slots": { "TIME": "AMAZON.TIME" },
    "utterances": [
      "what is {the|} angle {between clock hands|} at {-|TIME}"
    ]
  },
  function(request, response) {
    var time = request.slot("TIME");
    var h = parseInt(time.split(":")[0]);
    var m = parseInt(time.split(":")[1]);
    if (h == 12) {
      h = 0;
    }
    var angle = Math.abs((h * 30 + m * 0.5) - m * 6);
    response.say(`The angle between clock hands at <say-as interpret-as="time">${time}</say-as> is <say-as interpret-as="unit">${angle}°</say-as>`);
  }
);

module.exports = app;
