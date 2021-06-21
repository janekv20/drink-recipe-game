//Declare a variable
var lat = null;
var long = null;
var zipCode = "";
var term = "";


//Set up API key
const api_key = "hidden";

// create AJAX call
function displayRestaurants() {
    var queryURL = "https://api.yelp.com/v3/businesses/search?" + term'=' + "&location=" + zipCode
    $.ajax({
        url: queryURL,
        headers: {
            'Authorization': 'Bearer api_key'
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
