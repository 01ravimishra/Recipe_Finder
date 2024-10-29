document.getElementById("search-button").addEventListener("click", function() {
    const ingredients = document.getElementById("ingredient-input").value;
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    const apiKey = 'ca17573c7f564ac690f6644224bdddf0'; // Your API key
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById("recipe-container");
    container.innerHTML = ""; // Clear previous results

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "recipe-card");
        card.innerHTML = `
            <div class="card">
                <img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">
                <div class="card-body">
                    <h5 class="card-title">${recipe.title}</h5>
                    <p class="card-text">Ingredients: ${recipe.usedIngredientCount} used, ${recipe.missingIngredientCount} missing</p>
                    <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank" class="btn btn-primary">View Recipe</a>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}
