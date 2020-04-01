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
		for (var type of this.types) {
			typeContainer.innerHTML += type + ", "
		}
		var typeString = typeContainer.innerHTML;
		typeContainer.innerHTML = typeString.slice(0, -2);
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
		
		return item;
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