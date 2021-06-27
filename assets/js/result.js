const openEls = document.querySelectorAll("[data-open]");
var locationButton = document.querySelector('.brewerySubmit');

//global variable for score, retrieve score from local storage
var score = 0;
const saveScore = window.localStorage.getItem("score");
if (saveScore) {
    score = JSON.parse(saveScore);
}

//run cocktail function when "Play Game button is clicked"
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

//Display Cocktail Image, name, category, instructions and ingredient list
function displayCocktail(data) {
    const cocktail = data.drinks[0];
    const cocktailDiv = document.getElementById("cocktail")
    cocktailDiv.innerHTML = '';

    //Display Cocktail Image
    const cocktailImg =
        document.createElement("img");
    cocktailImg.src = cocktail.strDrinkThumb;
    cocktailDiv.appendChild(cocktailImg);
    //Display Cocktail Name
    const cocktailName = "<b>Cocktail Name:</b> " + cocktail.strDrink;
    const heading = document.createElement("h1");
    heading.innerHTML = cocktailName;
    cocktailDiv.appendChild(heading).style.fontSize = '20px';
    //Display Cocktail Category
    const cocktailCategory = "<b>Category:</b> " + cocktail.strCategory;
    const category = document.createElement("h2");
    category.innerHTML = cocktailCategory;
    cocktailDiv.appendChild(category);
    //Use Switch Statement to add scores to each Drink Category
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
    //Set localStorage for total score
    const jsonScore = JSON.stringify(score);
    window.localStorage.setItem("score", jsonScore);

    //Display Cocktail Instructions
    const cocktailInstruction = "<b>Instructions:</b> " + cocktail.strInstructions;
    const instructions = document.createElement("p");
    instructions.innerHTML = cocktailInstruction;
    cocktailDiv.appendChild(instructions);

    //Display Cocktail Ingredients
    const cocktailIngredients = document.createElement("ul");
    cocktailDiv.appendChild(cocktailIngredients);
    //Created object and loop to only display ingredients without "null" since ingredients not listed in an array
    const getIngredients = Object.keys(cocktail)
        .filter(function (ingredient) {
            return ingredient.indexOf("strMeasure") === 0 || ingredient.indexOf("strIngredient") === 0;
        })
        .reduce(function (ingredients, ingredient) {
            if (cocktail[ingredient] != null) {
                ingredients[ingredient] = cocktail[ingredient];
            }
            return ingredients;
        }, {});

    for (let key in getIngredients) {
        console.log(key);
        let value = getIngredients[key];
        listItem = document.createElement("li");
        listItem.innerHTML = value;
        cocktailIngredients.appendChild(listItem);
    }

    //Display Cocktail Score
    const cocktailScore = "<h2><strong>Your total score is:</strong></h2>" + score;
    const scoreDiv = document.createElement("score");
    scoreDiv.innerHTML = cocktailScore;
    cocktailDiv.appendChild(scoreDiv).style.fontSize = '30px';
}

var getBreweries = function (breweryInputEL) {
    urlAPI = "https://api.openbrewerydb.org/breweries?by_city=" + breweryInputEL;

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
            console.log(data);
            console.log(breweryInputEL);
            displayBreweries(data);

        })
}

//Display Brewery Names and Address if available
function displayBreweries(data) {
    //Since db list all data points in an array, created a for loop to display 5 breweries
    for (var i = 0; i < data.length && i < 5; ++i) {

        const brewery = data[i];
        const breweryDiv = document.getElementById("breweryDisplay");
        //Display Brewery Name
        const breweryName = brewery.name;
        const breweryheading = document.createElement("h1");
        breweryheading.innerHTML = breweryName;
        breweryDiv.appendChild(breweryheading);
        //Display Brewery Address
        var breweryAddress = brewery.street;
        if (!breweryAddress) {
            breweryAddress = "No address provided";
        }
        //List the Breweries
        const locationList = document.createElement("li");
        locationList.innerHTML = breweryAddress;
        breweryDiv.appendChild(locationList);
    }
}
//On click of Submit button, brewery information will be fetched and displayed.
locationButton.addEventListener('click', function (event) {
    var breweryInputEL = document.getElementById("breweryInput").value;
    window.brewerylocation = breweryInputEL
    getBreweries(breweryInputEL);
});

