var formName = document.getElementById("name");
localStorage.setItem("name", formName.value);

var userFeedback = document.getElementById("feedback");
localStorage.setItem("feedback", userFeedback.value);

var storedName = localStorage.getItem("name");
var storedFeedback = localStorage.getItem("feedback");

