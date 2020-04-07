alert("Javascript runs");

document.addEventListener("deviceready", onDeviceReadyEvent, false);

function onDeviceReadyEvent() {
	alert("onDeviceReadyEvent fires");
	onDeviceReady();
}

function onDeviceReady() {
	alert("onDeviceReady fires");
	$("form").submit(function(evt) {
		alert("form submit fires");
		evt.preventDefault();
		if (document.getElementById("username").value == "") return;
		if (document.getElementById("password").value == "") return;
		localStorage.username = document.getElementById("username").value;
		window.location.href = "MyRecipesPage.html";
	})
}

$(document).ready(function() {
	alert("$(document).ready fires")
	onDeviceReady();
})