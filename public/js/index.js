$(function () {
  // Start conversation with blank message
  sendMessage("");
  $("#input-text").focus();

  $("#input-form").submit(function (e) {
    e.preventDefault();

    var msgText = $("#input-text").val();
    if (msgText.length > 0) {
      $("#chat-log").append(
        "<p class='to-bot'>\
        <span class='sender'><strong>You</strong></span>\
        <span class='message'>" + msgText + "</span>"
      );
  
      $("#input-text").val("");
      $("#chat-log").scrollTop($("#chat-log").prop("scrollHeight"));
  
      sendMessage(msgText);
    }
  });
});

function sendMessage(msg)  {
  $.post("/send", {messageText: msg}, function(data) {
    appendBotMsg(data.msg);

    // Get reading from appropriate sensor
    if (data.intent && data.intent.length > 0) {
      var reading;
      if (data.intent === "temperature") {
        var t = 0.0;

        // TODO: get temperature reading

        reading = "The current temperature is  " + t + "&deg;F";
      } else if (data.intent === "humidity") {
        var h = 0.0;

        // TODO: get humidity reading

        reading = "The current humidity is " + h + "%";
      } else if (data.intent === "pressure") {
        var p = 0.0;

        // TODO: get pressure reading

        reading = "The current pressure is " + p + " mbar";
      }

      appendBotMsg(reading);
    }   

    $("#chat-log").scrollTop($("#chat-log").prop("scrollHeight"));
  })
  .fail(function() {
    // error submitting POST
    alert("Error submitting POST request!");
  });
}

function appendBotMsg(msgText) {
  $("#chat-log").append(
    "<p class='from-bot'>\
    <span class='sender'><strong>PiSenseBot</strong></span>\
    <span class='message'>" + msgText + "</span>"
  );
}