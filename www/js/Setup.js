import Recipe from "./Recipe.js";

const myRecipes = [
	new Recipe("Bananabread", ["Breakfast", "Lunch"], "2:45", "10", "img/Freshly_baked_banana_bread.jpg", ["250 g wheat flour", "2 tsp baking powder", "1 tsp ground cinnamon", "1 pinch of salt", "300 g of bananas", "100 g unsalted butter", "200 g caster sugar", "8 g vanilla sugar", "2 medium eggs", "125 ml crème fraîche"], "1. Preheat the oven to 180 °C. Grease the cake tin and line it with baking paper.<br><br>2. In a large bowl, sift the flour, baking powder, cinnamon and salt. Peel and mash the banana. Mix the butter, caster and vanilla sugar in the food processor in 20 sec. until an almost smooth mixture. Turn and add the eggs and crème fraîche one by one. Spoon through the flour mixture.<br><br>3. Spoon the banana puree into the batter. Divide over the cake tin and bake for about 1 hour until golden brown and cooked. After 50 min. Check for doneness with the skewer. If it comes out clean, the cake is done. Allow to cool for 30 minutes, then remove from the mold and allow to cool further on a grid for 1 hour."),
	new Recipe("Chicken in oystersauce", ["Dinner"], "0:35", "4", "img/Indonesian recipe by Vera.jpeg", ["300 g rice", "2 red paprikas", "1 pak choi", "150 g corn", "400 gr chickenfilet", "1 bottle of Oystersauce"], "1. Clean the rice in water multiple times until the water is clear. Put 300 g of rice in a ricecooker and add water until all the rice is covered. Cook the rice for 20 minutes in the oven for 20 minutes at 900 Watts.<br><br>2. While the rice is cooking, cut all the vegetables and the chickenfilet in small parts. Put all the vegetables in a bowl.<br><br>3. Cook the chicken until it is almost done. Add the vegetables to the pan with the chicken. Let it cook for 5 minutes.<br><br>4. Add the Oystersauce to the fryingpan with chicken and vegetables. Add as much as you like.<br><br>5. Turn off the heat. Grab the rice and selamat makan!<br><br>Tip: add some fried onions to it and EAT IT WITH A SPOON!")
];

const favoriteRecipes = [];

const discoverRecipes = [];

if (localStorage.myRecipes == undefined) {
	for (var myRecipe of myRecipes) {
		myRecipe.addToLocalStorage("myRecipes");
	}
}

if (localStorage.favoriteRecipes == undefined) {
	for (var favoriteRecipe of favoriteRecipes) {
		favoriteRecipe.addToLocalStorage("favoriteRecipes");
	}
}

if (localStorage.discoverRecipes == undefined) {
	for (var discoverRecipe of discoverRecipes) {
		discoverRecipe.addToLocalStorage("discoverRecipes");
	}
}