$(function () {
  // Start conversation with blank message
  appendMsgFrom(askWatson(""));
  $("#input-text").focus();

  // Handle input submission
  $("#input-form").submit(onSubmitQuestion);
});

/* Chat input submit handler */
function onSubmitQuestion(e) {
  e.preventDefault();

  var question = $("#input-text").val();
  if (question.length > 0) {
    // Clear input and append question to chat
    $("#input-text").val("");
    appendMsgTo(question);
    // Ask Watson and append response to chat 
    var answer = askWatson(question);
    appendMsgFrom(answer);
  }
}

/* Send message to web service and recieve response from Watson */
function askWatson(msg) {
  // TODO: implement AJAX call to Node-RED service
  return "Add response here";
}

/* Append message to bot to chat log */
function appendMsgTo(msg)  {
  $("#chat-log").append(
    "<p class='to-bot'>\
    <span class='sender'><strong>You</strong></span>\
    <span class='message'>" + msg + "</span>"
  );

  $("#chat-log").scrollTop($("#chat-log").prop("scrollHeight"));
}

/* Append message from bot to chat log */
function appendMsgFrom(msg) {
  $("#chat-log").append(
    "<p class='from-bot'>\
    <span class='sender'><strong>PiSenseBot</strong></span>\
    <span class='message'>" + msg + "</span>"
  );

  $("#chat-log").scrollTop($("#chat-log").prop("scrollHeight"));
}