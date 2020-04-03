$(document).ready(function() {
	document.getElementById("navUsername").innerHTML = localStorage.username;
})

function openNav() {
	var sideNavStyle = document.getElementById("sidenav").style;
	sideNavStyle.width = "250px";
	sideNavStyle.borderRight = "2px solid #FFB1A4";
	document.getElementById("appContainer").style.opacity = 0.5;
}

function closeNav() {
	var sideNavStyle = document.getElementById("sidenav").style;
	sideNavStyle.width = "0";
	sideNavStyle.border = "none";
	document.getElementById("appContainer").style.opacity = 1;
}