
/*const openEls = document.querySelectorAll("[data-open]");
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
};

document.addEventListener("click", e => {
    if (e.target == document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible [data-close]").click();
    }
});

document.addEventListener("keyup", e => {
    // if we press the ESC
    if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
        document.querySelector(".modal.is-visible [data-close]").click();
    }
});
*/
//Declare a variable
var lat = null;
var long = null;
var zipCode = "";
var term = "";
require('dotenv/config')

const db = require('db')
db.connect({
    key: process.env.API_KEY
})

//Set up API key


// create AJAX call
function displayRestaurants() {
    var queryURL = "https://api.yelp.com/v3/businesses/search?" + term + "&=location=" + zipCode
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer API_KEY'
        },
        method: "GET",
        dataType: 'json',
        success: function () {
            //Display a header on the page with results
            $('#results').append(' <h5>Here are your restaurant options!</h5>');
            //Iterate through the JSON array of restaurants which was returned by Yelp API
            $.each(data.businesses, function (i, item) {
                //Store each restaurant object in a variable
                var restaurantName = item.name;
                var foodGenre = item.categories;
                var yelpRating = item.rating;
                var restaurantLoc = item.location;
                var cost = item.price;
                //Append results onto homepage
                $('results').append('Restaurant: <b>' + restaurantName + '<b><br> Food Genre: ' + foodGenre + '<br>Rating: ' + yelpRating + '<br>Location: ' + restaurantLoc + '<br>Price: ' + cost);
            });
        }
    }
    )
};
