var bodyParser = require('body-parser');
var express = require("express");
var app = express();

var ConversationV1 = require('watson-developer-cloud/conversation/v1');

// Set up Conversation service wrapper.
var conversation = new ConversationV1({
  username: '74538a5f-bc30-4c2f-9653-3ca0478ea00f',
  password: 'hOx1NendhDPS',
  version_date: '2017-05-26'
});

var workspace_id = '952a0775-bebc-4b5c-95cd-f0e053f4965e';

// view engine
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Render main page
app.get("/", function (req, res) {
	res.render("index.ejs");
});

// Send input to Watson
app.post("/send", function (req, res) {
	var messageData = {
		workspace_id: workspace_id,
	}

	if (req.body.messageText.length > 0) {
		messageData.input = {text: req.body.messageText};
	}

	conversation.message(messageData, function(err, response) {
    var errMsg = "An unexpected error has occurred. Please refresh the page and try again.";
		if (err) {
			res.json({msg: errMsg});
			return;
		}

    var intentDetected;

		if (response.intents.length > 0) {
      console.log('Detected intent: #' + response.intents[0].intent);

      if (response.context.sensor) {
        var sensor = response.context.sensor;
        console.log('Read sensor: ' + sensor);
        if (sensor === "temperature") {
          intentDetected = "temperature";
        } else if (sensor === "humidity") {
          intentDetected = "humidity";
        } else if (sensor === "pressure") {
          intentDetected = "pressure";
        } else {
          // invalid sensor value
        }
      } else {
        // Error: no action 
      }
    }
  
    // Display the output from dialog, if any.
    if (response.output.text.length != 0) {
      res.json({
        msg: response.output.text[0],
        intent: intentDetected
      }
    );
    } else {
      res.json({msg: errMsg});
    }
	});
});

// Listen for requests
app.listen(3000, function () {
	console.log("Listening on port 3000");
});