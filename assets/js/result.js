const openEls = document.querySelectorAll("[data-open]");
const closeEls = document.querySelectorAll("[data-close]");
const isVisible = "is-visible";

for (const el of openEls) {
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
