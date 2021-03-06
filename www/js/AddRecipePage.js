/* global Recipe */

$(document).ready(function() {
	$("#ingredient0").on("input", AddIngredients);
	$("#Picture").on("change", readURL);
	$("#addRecipe").on("click", addRecipe);
});


var ingredientsIndex = 0;
function AddIngredients () {
	$("#ingredient" + ingredientsIndex).off();
	ingredientsIndex++;
	
	var newIngredient = document.createElement("input");
	newIngredient.id = "ingredient" + ingredientsIndex;
	newIngredient.type = "text";
	
	document.getElementById("Ingredients").appendChild(newIngredient);
	$("#ingredient" + ingredientsIndex).on("input", AddIngredients);
}

function readURL() 
{
	var input = document.getElementById("Picture");
    document.getElementById("PicturePreview").style.display = "block";

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById('PicturePreview').src =  e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
	var scale = Math.max(img.width * img.height / 300000, 1);
	img.width = img.width / scale;
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function addRecipe() {
	var name = document.getElementById("name").value;
	if (name == '') return;
	
	var types = [];
	if (document.getElementById("breakfast").checked) types.push("Breakfast");
	if (document.getElementById("lunch").checked) types.push("Lunch");
	if (document.getElementById("dinner").checked) types.push("Dinner");
	if (document.getElementById("snack").checked) types.push("Snack");
	
	var time = document.getElementById("time").value;
	if (time == '') return;
	
	var servings = document.getElementById("servings").value;
	if (servings == '') return;
	
	var ingredients = [];
	for (var i = 0; i <= ingredientsIndex; i++) {
		var ingredient = document.getElementById("ingredient" + i).value;
		if (ingredient != '') ingredients.push(ingredient);
	}
	if (ingredients.length == 0) return;
	
	var method = document.getElementById("method").value;
	if (method == '') return;
	
	var image = "data:image/png;base64," + getBase64Image(document.getElementById("PicturePreview"));
	
	var recipe = new Recipe(name, types, time, servings, image, ingredients, method, false);
	
	recipe.addToLocalStorage("myRecipes");
	
	window.location.href = "MyRecipesPage.html";
}