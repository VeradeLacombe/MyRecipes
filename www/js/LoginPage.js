$(document).ready(function() {
	$("#form").submit(function(evt) {
		evt.preventDefault();
		if (document.getElementById("username").value == "") return;
		if (document.getElementById("password").value == "") return;
		localStorage.username = document.getElementById("username").value;
		window.location.href = "MyRecipesPage.html";
	})
})