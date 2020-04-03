import Recipe from "./Recipe.js";

$(document).ready(function() {
	// Retrieve recipe
	var recipe = Recipe.unserialize(localStorage.displayRecipe);
	
	// Display name of recipe
	document.getElementById("header").innerHTML += recipe.name;
	
	//Display photo
	document.getElementById("image").src = recipe.image;
	
	//Display type of meal
	document.getElementById("types").innerHTML = recipe.typesToString();
	
	//Display preparation time
	document.getElementById("time").innerHTML = recipe.time; 
	
	//Display servings 
	document.getElementById("servings").innerHTML = recipe.servings + ' servings';
	
	//Display ingredients
	var ingredientsElement = document.getElementById("ingredientsList");
	for (var ingredient of recipe.ingredients){
		var ingredientElement = document.createElement("li");
		ingredientElement.innerHTML = ingredient;
		ingredientsElement.appendChild(ingredientElement);
	}
	
	//Display method
	document.getElementById("method").innerHTML = recipe.method;
	
	//Back button works	
	document.getElementById("backButton").onclick = function() {
		window.location.href = localStorage.previousPage;
	};
});