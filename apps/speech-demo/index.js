'use strict';

var alexa = require("alexa-app");
var app = new alexa.app("speech-demo");

var card = {
  type: 'Standard',
  title: 'Speech Demo',
  text: 'Sample Alexa Skills written for Kainos Tech Feast Presentation',
  image: {
    smallImageUrl: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/small.png`,
    largeImageUrl: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/large.png`
  }
};

app.post = function(request, response, type, exception) {
  if (exception) {
    console.error("An error occured: " + exception);
    response.clear().say("An error occured. Please try again later.");
  } else if (type != 'SessionEndedRequest') {
    response.card(card);
  }
};

app.launch(function(request, response) {
  response.shouldEndSession(false);
  response.say(`Welcome to Tech Feast demo application!`);
});

app.intent("ShowTime", {
    "utterances": [
      "show time",
      "let's start",
      "show me what you got"
    ]
  },
  function(request, response) {
    response.shouldEndSession(false);
    if (request.hasSession()) {
        var session = request.getSession();
        var counter = session.get('counter');
        if (counter == null) {
          counter = 1;
        } else {
          counter = parseInt(counter) + 1;
        }
        session.set('counter', counter.toString());
    }
    response.say(
    "<p>Show Time demonstrates some of the <say-as interpret-as='spell-out'>SSML</say-as> features</p>" +
    "Like pausing <break time='3s' />" +
    "<p>I can only speek English and German, but can pronounce phonems like this: " +
    "<phoneme alphabet='ipa' ph='ˈwukaʂ ˈbudnik'>Łukasz Budnik</phoneme></p>" +
    `Or play a sound like <audio src="https://${process.env.HEROKU_APP_NAME}.herokuapp.com/windows98.mp3"/>` +
    "<p>Alexa has also a built-in support for sessions</p>" +
    `This is your <say-as interpret-as='ordinal'>${counter}</say-as> invocation.`);
  }
);


module.exports = app;
