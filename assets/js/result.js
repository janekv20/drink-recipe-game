const openEls = document.querySelectorAll("[data-open]");
var score = 0;


for (const el of openEls) {
<<<<<<< HEAD
    el.addEventListener("click", function () {

        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")

            .then(function (response) {
                // request was successful
                if (response.ok) {
                    //  console.log(response);
                    return response.json();
                } else {
                    alert("Error: " + response.statusText);
                }
            })
            .then(function (data) {
                console.log(data);
                displayCocktail(data);
            })
            .catch((error) => {
                console.error("FETCH ERROR", error);
            });

    }
    )
}

function displayCocktail(data) {
    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById("cocktail");
    cocktailDiv.innerHTML = '';

    const cocktailName = cocktail.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading);

    const cocktailImg =
        document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    document.body.style.backgroundImage = "url('" +
        cocktail.strDrinkThumb + "')";

    const cocktailCategory = "<b>Category:</b> " + cocktail.strCategory;
    const category = document.createElement("h2");
    category.innerHTML = cocktailCategory;
    cocktailDiv.appendChild(category);

    switch (cocktail.strCategory) {
        case "Punch / Party Drink":
            score += 5;
            break;
        case "Soft Drink / Soda":
            score += 1;
            break;
        case "Cocktail":
            score += 8;
            break;
        case "Shot":
            score += 10
            break;
        case "Ordinary Drink":
            score += 2;
            break;
        case "Coffee / Tea":
            score += 2;
            break;
        case "Beer":
            score += 3;
            break;
        default:
            score += 1;
    }

    const cocktailInstruction = "<b>Instructions:</b> " + cocktail.strInstructions;
    const instructions = document.createElement("p");
    instructions.innerHTML = cocktailInstruction;
    cocktailDiv.appendChild(instructions);

    const cocktailIngredients =
        document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);

    const getIngredients = Object.keys(cocktail)
        .filter(function (ingredient) {
            return ingredient.indexOf("strIngredient") == 0;
        })
        .reduce(function (ingredients, ingredient) {
            if (cocktail[ingredient] != null) {
                ingredients[ingredient] = cocktail[ingredient];
            }
            return ingredients;
        }, {});

    for (let key in getIngredients) {
        let value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredients.appendChild(listItem);
    }

    const cocktailScore = "<h2>Your total score is:</h2>" + score;
    const scoreDiv = document.createElement("score");
    scoreDiv.innerHTML = cocktailScore;
    cocktailDiv.appendChild(scoreDiv);
}


=======
  el.addEventListener("click", function () {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}

for (const el of closeEls) {
  el.addEventListener("click", function () {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}

document.addEventListener("click", (e) => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible [data-close]").click();
  }
});

document.addEventListener("keyup", (e) => {
  // if we press the ESC
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible [data-close]").click();
  }
});

// when we press Go button
document.addEventListener("click", (e) => {
  if (e.target == document.querySelector("#goSearch")) {
    document.querySelector("#goSearch").click();
    displayRestaurants();
  }
});

var foodInput = document.querySelector(".food");
var locationInput = document.querySelector(".location");
var foodInputEl = foodInput.value;
var locationInputEl = locationInput.value;
var resultsDisplay = document.querySelector(".results");

const api_key =
  "bX-trm4auNudxiiAeCbSA6jNygnErRfxAHTFg6uFaE_muyIDm9VDO6s4cZyx7M-2N7prlSry13TwEvrwzpq3OkO83KVAdcLXRMquZZ8zXK7WxyrgKHs-sk0RIjnRYHYx";

function displayRestaurants(data) {
  var queryURL =
    "https://api.yelp.com/v3/businesses/search?" +
    foodInputEl +
    "location=" +
    locationInputEl;

  fetch(queryURL)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        //  console.log(response);
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then((data) => {
      var restaurantName = item.name;
      var foodGenre = item.categories;
      var yelpRating = item.rating;
      var restaurantLoc = item.location;
      var cost = item.price;
      //Append results onto homepage
      resultsDisplay.extContent =
        "Restaurant: <b>" +
        restaurantName +
        "<b><br> Food Genre: " +
        foodGenre +
        "<br>Rating: " +
        yelpRating +
        "<br>Location: " +
        restaurantLoc +
        "<br>Price: " +
        cost;
    });
}
var queryURL =
  "https://api.yelp.com/v3/businesses/search?" +
  foodInputEl +
  "=&location=" +
  locationInputEl;

fetch(queryURL)
  .then(function (response) {
    // request was successful
    if (response.ok) {
      //  console.log(response);
      return response.json();
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .then((data) => {
    var restaurantName = item.name;
    var foodGenre = item.categories;
    var yelpRating = item.rating;
    var restaurantLoc = item.location;
    var cost = item.price;
    //Append results onto homepage
    resultsDisplay.extContent =
      "Restaurant: <b>" +
      restaurantName +
      "<b><br> Food Genre: " +
      foodGenre +
      "<br>Rating: " +
      yelpRating +
      "<br>Location: " +
      restaurantLoc +
      "<br>Price: " +
      cost;
  });

var getLocation = function (data) {
  var apiURL = fetch(apiURL)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        //  console.log(response);
        return response.json();
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .then((data) => {});
};
>>>>>>> 5f4b6d94c00431440713868017ca1ce7b937c069
