import Recipe from "./Recipe.js";

const recipes = [new Recipe("Bananabread", ["Breakfast", "Lunch"], "2:45", "10", "img/Freshly_baked_banana_bread.jpg", ["250 g wheat flour", "2 tsp baking powder", "1 tsp ground cinnamon", "1 pinch of salt", "300 g of bananas", "100 g unsalted butter", "200 g caster sugar", "8 g vanilla sugar", "2 medium eggs", "125 ml crème fraîche"], "Preheat the oven to 180 °C. Grease the cake tin and line it with baking paper. In a large bowl, sift the flour, baking powder, cinnamon and salt. Peel and mash the banana. Mix the butter, caster and vanilla sugar in the food processor in 20 sec. until an almost smooth mixture. Turn and add the eggs and crème fraîche 1 by 1. Spoon through the flour mixture. Spoon the banana puree into the batter. Divide over the cake tin and bake for about 1 hour until golden brown and cooked. After 50 min. Check for doneness with the skewer. If it comes out clean, the cake is done. Allow to cool for 30 minutes, then remove from the mold and allow to cool further on a grid for 1 hour. Bon appétit!")];

function UpdateRecipeList() {
	// Get and clear the recipe container
	var recipeContainer = document.getElementById("recipeContainer");
	recipeContainer.innerHTML = '';
	
	for (var recipe of recipes) {
		DisplayRecipe(recipe)
	}
	
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