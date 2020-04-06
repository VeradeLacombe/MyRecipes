/* global Recipe */

$(document).ready(function() {
	// Retrieve recipe
	var recipe = Recipe.unserialize(localStorage.displayRecipe);
	
	// Display name of recipe
	document.getElementById("name").innerHTML = recipe.name;
	
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
	
	if (recipe.isInLocalStorage("myRecipes")) {
		// Hide the add button
		document.getElementById("addButton").style.display = "none";
		
		// Edit button works
		document.getElementById("edit").onclick = function() {
			localStorage.previousPage2 = window.location.href;
			window.location.href = "EditRecipePage.html";
		};
		
		// Delete buttons works
		document.getElementById("delete").onclick = function() {
			recipe.deleteFromLocalStorage("myRecipes");
			recipe.deleteFromLocalStorage("favoriteRecipes");
			window.location.href = localStorage.previousPage;
		};
	} else {
		// Hide the edit and delete buttons
		document.getElementById("buttons").style.display = "none";
		
		// Add button works
		document.getElementById("addButton").onclick = function () {
			recipe.addToLocalStorage("myRecipes");
			window.location.href = "MyRecipesPage.html";
		};
	}
});