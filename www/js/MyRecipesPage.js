/* global Recipe */

function UpdateRecipeList() {
	// Get and clear the recipe container
	var recipeContainer = document.getElementById("recipeContainer");
	recipeContainer.innerHTML = '';
	
	// Retrieve the recipe list from localStorage
	if (localStorage.myRecipes != undefined) {
		var list = JSON.parse(localStorage.myRecipes);
		
		for (var serializedRecipe of list) {
			DisplayRecipe(Recipe.unserialize(serializedRecipe));
		}
	}
}

var filter = "All";

function DisplayRecipe(recipe) {
	if (filter != "All") {
		if (!recipe.types.includes(filter)) return;
	}
	document.getElementById("recipeContainer").appendChild(recipe.createListItemWithHeartButton());
}

function filterButtonPress(buttonElement){
	// Turn the text and border pink, for all filter buttons
	$(".filterButton").css("color", "#FFB1A4");
	$(".filterButton").css("border-bottom","none");
	
	// Turn text and border white, on the button I clicked 
	buttonElement.style.color = "#F2F2F2";
	buttonElement.style.borderBottom = "2px solid #F2F2F2";
	
	// Update the list
	filter = buttonElement.innerHTML;
	UpdateRecipeList();
}

$(document).ready(function() {
	$(".filterButton").on("click", function() {filterButtonPress(this)});
	UpdateRecipeList();
});