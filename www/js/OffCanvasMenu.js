$(document).ready(function() {
	document.getElementById("navUsername").innerHTML = localStorage.username;
})

function openNav() {
	var sideNavStyle = document.getElementById("sidenav").style;
	sideNavStyle.transform = "translateX(0)"
	document.getElementById("appContainer").style.opacity = 0.5;
}

function closeNav() {
	var sideNavStyle = document.getElementById("sidenav").style;
	sideNavStyle.transform = "translateX(-250px)"
	document.getElementById("appContainer").style.opacity = 1;
}