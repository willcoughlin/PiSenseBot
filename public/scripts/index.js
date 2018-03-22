$(function () {
  // Start conversation with blank message
  appendMsgFrom("Welcome, how can I help you?")
  $("#input-text").focus();

  // Handle input submission
  $("#input-form").submit(onSubmitQuestion);
});

/* Chat input submit handler */
function onSubmitQuestion(e) {
  e.preventDefault();

  $("#input-text").focus(); // keep focus on input
  var question = $("#input-text").val();
  if (question.length > 0) {
    // Clear input and append question to chat
    $("#input-text").val("");
    appendMsgTo(question);
    // Ask Watson
    askWatson(question);
  }
}

/* Send message to web service and recieve response from Watson */
function askWatson(msg) {
  appendMsgFrom("Just a moment."); 

  /*
   Query Watson endpoint
   - URL: https://pisensebotcloud.mybluemix.net/query
   - HTTP method: POST
   - Request data type: text/plain
   - Response data type: text/plain
   - Cross-origin request? Yes.
  */
 // TODO: Query service for answer from Watson
  $.ajax({url: "https://pisensebotcloud.mybluemix.net/query", 
    data: msg, 
    crossDomain: true, 
    method: "POST", 
    dataType: "text",
    contentType: "text/plain",
    success: function(response) {
      appendMsgFrom(response);
    }});
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