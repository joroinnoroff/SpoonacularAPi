function getRecipeDetails() {
  var apiKey = "dd7220bbb767449dbfb5ef908b70d910"; // Replace with your actual API key
  var urlParams = new URLSearchParams(window.location.search);
  var recipeId = urlParams.get("id");
  var apiUrl =
    "https://api.spoonacular.com/recipes/" + recipeId + "/information";

  // Make the API request
  fetch(apiUrl + "?apiKey=" + apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the response
      var recipe = data;
      var recipeDetailsContainer = document.getElementById(
        "recipeDetailsContainer"
      );

      // Display the recipe details
      recipeDetailsContainer.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <ul>
        <li>${recipe.instructions}</li>
      </ul>
  
      `;
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

getRecipeDetails();
