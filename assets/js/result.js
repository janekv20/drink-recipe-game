
const openEls = document.querySelectorAll("[data-open]");
var score = 0;


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


