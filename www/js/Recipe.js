export default class Recipe {
	constructor(name, types, time, servings, image, ingredients, method) {
		this.name = name;
		this.types = types;
		this.time = time;
		this.servings = servings;
		this.image = image;
		this.ingredients = ingredients;
		this.method = method;
	}
	
	createListItem() {
		// Create item element
		var item = document.createElement("div");
		item.className = "ListItem";
		
		// Create image container
		var imageContainer = document.createElement("div");
		imageContainer.className = "ImageContainer";
		var image = document.createElement("img");
		image.className = "image";
		image.src = this.image;
		imageContainer.appendChild(image);
		item.appendChild(imageContainer);
		
		// Create name container
		var nameContainer = document.createElement("p");
		nameContainer.className = "NameContainer";
		nameContainer.innerHTML = this.name;
		item.appendChild(nameContainer);
		
		// Create type container
		var typeContainer = document.createElement("p");
		typeContainer.className = "TypeContainer";
		typeContainer.innerHTML = this.typesToString();
		item.appendChild(typeContainer);
		
		// Create time icon
		var timeIcon = document.createElement("i");
		timeIcon.className = "fas";
		timeIcon.innerHTML = "&#xf017;";
		item.appendChild(timeIcon);
		
		// Create time container
		var timeContainer = document.createElement("p");
		timeContainer.className = "TimeContainer";
		timeContainer.innerHTML = this.time;
		item.appendChild(timeContainer);
		
		// Create break
		item.appendChild(document.createElement("br"));
		
		// Create servings icon
		var servingsIcon = document.createElement("i");
		servingsIcon.className = "fas";
		servingsIcon.innerHTML = "&#xf0c0;";
		item.appendChild(servingsIcon);
		
		// Create servings container
		var servingsContainer = document.createElement("p");
		servingsContainer.className = "ServingsContainer";
		servingsContainer.innerHTML = this.servings + " servings";
		item.appendChild(servingsContainer);
		
		// Make clickable
		item.recipe = this;
		item.onclick = function() { 
			localStorage.displayRecipe = this.recipe;
			localStorage.previousPage = window.location.href;
			window.location.href = "DisplayRecipePage.html";
		}
		
		return item;
	}
	
	// For the my Recipes page
	createListItemWithHeartButton() {
		var item = this.createListItem();
		
		// Create heart button
		var heartButton = document.createElement("i");
		heartButton.className = "material-icons";
		
		if(this.isInLocalStorage("favoriteRecipes")) {
			// Make the heart button filled and red
			heartButton.innerHTML = "favorite";
			heartButton.style.color = "red";
		}
		else {
			// Make the heart button open and black
			heartButton.innerHTML = "favorite_border";
		}
		
		heartButton.recipe = this;
		heartButton.onclick = function() {FavouriteButtonClick(this);};
		item.appendChild(heartButton);
		
		return item;
	}
	
	// For the discover page
	createListItemWithAddButton() {
		var item = this.createListItem();
		
		// Create add button
		var addButton = document.createElement("i");
		addButton.className = "w3-button w3-xlarge w3-circle w3-teal";
		addButton.innerHTML = "+";
		addButton.recipe = this;
		addButton.onclick = function() {AddButtonClick(this)};
		item.appendChild(addButton);
		
		return item;
	}
	
	isInLocalStorage(storageName) {
		// If the localStorage list does not exist
		if (localStorage.getItem(storageName) == undefined) {
			// Then it can't be in the list
			return false;
		}
		else {
			// Retrieve the localStorage list
			var list = JSON.parse(localStorage.getItem(storageName));
			
			// For each recipe in the list
			for (var i = 0; i < list.length; i++) {
				// Get that recipe
				var otherRecipe = Recipe.unserialize(list[i]);
				
				// If that recipe is equal to this recipe
				if (this.equals(otherRecipe)) {
					// Then this recipe is in the list
					return true;
				}
			}
			
			// If it isn't found, it's not in the list
			return false;
		}
	}
	
	addToLocalStorage(storageName) {
		// If the localStorage list does not exist yet
		if (localStorage.getItem(storageName) == undefined) {
			// Create the localStorage list, containing this recipe
			localStorage.setItem(storageName, JSON.stringify([JSON.stringify(this)]));
		}
		else {
			// Retrieve the localStorage list
			var list = JSON.parse(localStorage.getItem(storageName));
			
			// Add this recipe to the list
			list.push(JSON.stringify(this));
			
			// Update the localStorage
			localStorage.setItem(storageName, JSON.stringify(list));
		}
	}
	
	deleteFromLocalStorage(storageName) {
		// If the localStorage list does not exist
		if (localStorage.getItem(storageName) == undefined) {
			// The recipe is not in the list, so we don't need to delete it
		}
		else {
			// Retrieve the localStorage list
			var list = JSON.parse(localStorage.getItem(storageName));
			
			// For each recipe in the list
			for (var i = 0; i < list.length; i++) {
				// Get that recipe
				var otherRecipe = Recipe.unserialize(list[i]);
				
				// If that recipe is equal to this recipe
				if (this.equals(otherRecipe)) {
					// Then delete the recipe from the list
					list.splice(i, 1);
					i--;
				}
			}
			
			// Update the localStorage
			localStorage.setItem(storageName, JSON.stringify(list));
		}
	}
	
	equals(otherRecipe) {
		return JSON.stringify(this) === JSON.stringify(otherRecipe);
	}
	
	typesToString() {
		var typeString = "";
		
		for (var type of this.types) {
			// Put every type in the string
			typeString += type + ", "
		}
		
		// Remove the last ", "
		typeString = typeString.slice(0, -2);
		
		return typeString;
	}
	
	// Transform the Recipe object into a string
	toString() {
		return JSON.stringify({
			"name": this.name,
			"types": this.types,
			"time": this.time,
			"servings": this.servings,
			"image": this.image,
			"ingredients": this.ingredients,
			"method": this.method,
		});
	}
	
	// Transform the string back into a Recipe object
	static unserialize(data) {
		data = JSON.parse(data);
		var recipe = new Recipe;
		recipe.name = data.name;
		recipe.types = data.types;
		recipe.time = data.time;
		recipe.servings = data.servings;
		recipe.image = data.image;
		recipe.ingredients = data.ingredients;
		recipe.method = data.method;
		return recipe;
	}
}

function FavouriteButtonClick(heartButtonElement) {
	var recipe = heartButtonElement.recipe;
	
	if (heartButtonElement.innerHTML == "favorite_border") {
		// Add the recipe to favourites
		recipe.addToLocalStorage("favoriteRecipes");
		
		// Fill the heart button
		heartButtonElement.innerHTML = "favorite";
		
		// Make the heart button red
		heartButtonElement.style.color = "red";
	}
	else {
		// Remove the recipe from favourites
		recipe.deleteFromLocalStorage("favoriteRecipes");
		
		// Empty the heart button
		heartButtonElement.innerHTML = "favorite_border";
		
		// Make the heart button red
		heartButtonElement.style.color = "#262626";
	}
	
	event.stopPropagation();
}

function AddButtonClick(addButtonElement) {
	event.stopPropagation();
	
	var recipe = addButtonElement.recipe;
	recipe.addToLocalStorage("myRecipes");
	recipe.deleteFromLocalStorage("discoverRecipes");
	addButtonElement.parentElement.style.display = "none";
	
}