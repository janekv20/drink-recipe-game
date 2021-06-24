const openEls = document.querySelectorAll("[data-open]");
var cocktailDrink
var cocktailScore = 0;


for (const el of openEls) {
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

    const cocktailName = "<h1><b>Cocktail Name:" + cocktail.strDrink;
    window.cocktailDrink = cocktailName;
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
            cocktailScore += 5;
            break;
        case "Soft Drink / Soda":
            cocktailScore += 1;
            break;
        case "Cocktail":
            cocktailScore += 8;
            break;
        case "Shot":
            cocktailScore += 10
            break;
        case "Ordinary Drink":
            cocktailScore += 2;
            break;
        case "Coffee / Tea":
            cocktailScore += 2;
            break;
        case "Beer":
            cocktailScore += 3;
            break;
        default:
            cocktailScore += 1;
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

    const finalScore = "<h2><b>Your total score is: " + cocktailScore;
    const scoreDiv = document.createElement("finalScore");
    scoreDiv.innerHTML = cocktailScore;
    cocktailDiv.appendChild(scoreDiv);
}

var postal = "";
var getBreweries = function (data) {
    urlAPI = "https://api.openbrewerydb.org/breweries?by_postal=" + postal;

    fetch(urlAPI)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                alert("Error: " + response.statusText);
            }
        }).then((data) => {
            console.log(cocktailDrink)
            displayBreweries()

        })
}

var displayBreweries = function (data) {
    const brewery = obdb.name;
    const breweryDiv = document.querySelector(".breweryDisplayed");
    breweryDiv.innerHTML = '';

}

localStorage.setItem('cocktailScore', []);
var retrievedScore = localStorage.getItem('cocktailScore');

// function displayScore() {
//     const highScores =
//         window.localStorage.getItem("highScores");
//     if (!highScores) {
//         highScores = [];
//     }
//     if (highScores.length >= 5) {
//         highScores.sort((a, b) => b.score - a.score);
//     } else {
//         highScores.push(score);
//     }

//     window.localStorage.setItem("highScores", JSON.stringify(highScores));
// }