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
		item.appendChild(typeContainer)
		
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
}