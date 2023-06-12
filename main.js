function getMealPlan() {
  var apiKey = "dd7220bbb767449dbfb5ef908b70d910"; // Replace with your actual API key
  var apiUrl = "https://api.spoonacular.com/mealplanner/generate";
  var recipeImagePath = "https://spoonacular.com/recipeImages/";

  // Make the API request to get the meal plan for the week
  fetch(apiUrl + "?apiKey=" + apiKey + "&timeFrame=week")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the response
      console.log(data); // Log the response data to the console for inspection

      if (data && data.week) {
        var mealPlan = data.week;
        var nutrients = data.nutrients || {}; // Handle undefined nutrients

        // Display the meal plan
        var mealPlanContainer = document.getElementById("mealPlanContainer");

        // Clear previous meal plan
        mealPlanContainer.innerHTML = "";

        // Display each day's meals
        Object.keys(mealPlan).forEach(function (dayOfWeek) {
          var day = mealPlan[dayOfWeek];
          var dayElement = document.createElement("div");
          dayElement.classList.add("day");

          var meals = day.meals;
          var mealList = "";

          // Display each meal for the day
          meals.forEach(function (meal) {
            var mealImage = recipeImagePath + meal.id + "-556x370.jpg";
            mealList += `
              <li>
                <img src="${mealImage}" alt="${meal.title}" />
                <span>${meal.title}</span>
              </li>
            `;
          });

          dayElement.innerHTML = `
            <div class="main">
              <ul class="cards">
                <li class="cards_item">
                  <div class="card">
               
                    <div class="card_content">
                      <h2 class="card_title">${dayOfWeek}</h2>
                      <div class="card_text">
                      
                        <ul>${mealList}</ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          `;

          mealPlanContainer.appendChild(dayElement);
        });

        // Display the overall nutrition information
        var nutrientsContainer = document.getElementById("nutrientsContainer");
        nutrientsContainer.innerHTML = `
          <h2>Overall Nutrition Information</h2>
          <ul>
            <li>Calories: ${
              nutrients.calories ? nutrients.calories.toFixed(2) : 0
            }</li>
            <li>Protein: ${
              nutrients.protein ? nutrients.protein.toFixed(2) : 0
            }</li>
            <li>Fat: ${nutrients.fat ? nutrients.fat.toFixed(2) : 0}</li>
            <li>Carbohydrates: ${
              nutrients.carbohydrates ? nutrients.carbohydrates.toFixed(2) : 0
            }</li>
          </ul>
        `;
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

getMealPlan();

function searchRecipes() {
  var apiKey = "dd7220bbb767449dbfb5ef908b70d910"; // Replace with your actual API key
  var searchQuery = document.getElementById("searchInput").value;
  var apiUrl = "https://api.spoonacular.com/recipes/search";

  // Make the API request to search for recipes
  fetch(apiUrl + "?apiKey=" + apiKey + "&query=" + searchQuery)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Process the response
      var recipeIds = data.results.slice(0, 5).map(function (recipe) {
        return recipe.id;
      });

      // Get detailed recipe information for each recipe
      Promise.all(
        recipeIds.map(function (id) {
          var recipeInfoUrl =
            "https://api.spoonacular.com/recipes/" + id + "/information";
          return fetch(recipeInfoUrl + "?apiKey=" + apiKey).then(function (
            response
          ) {
            return response.json();
          });
        })
      )
        .then(function (recipes) {
          var searchResultsContainer = document.getElementById(
            "searchResultsContainer"
          );

          // Clear previous search results
          searchResultsContainer.innerHTML = "";

          // Display each recipe
          recipes.forEach(function (recipe) {
            var recipeElement = document.createElement("div");
            recipeElement.classList.add("recipe");

            // Construct the absolute URL for the image
            var imageUrl = recipe.image;

            recipeElement.innerHTML = `
              <h2>${recipe.title}</h2>
              <img src="${imageUrl}" alt="${recipe.title}" />
              <p>${recipe.summary}</p>
              <button onclick="showRecipeInformation(${recipe.id})">View Details</button>
            `;

            searchResultsContainer.appendChild(recipeElement);
          });
        })
        .catch(function (error) {
          console.log("Error:", error);
        });
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}
