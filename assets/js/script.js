/*
DO NOT UNCOMMENT - THIS CODE DOES NOT WORK
function activatePlacesSearch() {
	let input = document.getElementById('searchCity');
	let autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		let place = autocomplete.getPlace();
		console.log(place.formatted_address);
		console.log(place.url);
		console.log(place.reference);
		console.log(place);
	});
}
*/


$("#searchZip").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
		$("#menuSearch").click();
	} 
}); 

$("#searchBtn").on("click", function(event) {
	event.preventDefault();

	// get the value of the input from user
	const zip = $("#searchZip").val().trim();
	
	// clear input box
	$("#searchZip").val("");

	// add class of hide to bg-primary
	$('.bg-primary').addClass('hide');

	// remove class of hide from second-display
	$('.second-display').removeClass('hide');

	getRestaurantApi(zip);
		
});

// function to get the restaurant api info
function getRestaurantApi(zip) {
	// setup object and headers to use the restaurant api using RapidAPI
	const searchZip = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "ae4b491594mshe5191aa0d24709dp16f364jsnbd5633bebe54"
		}
	}

	// ajax call of the response we get back from the api
	$.ajax(searchZip).done(function (response) {
		console.log(response);
		getLatAndLon(response.result.data[0].geo.lat, response.result.data[0].geo.lon);
	});
}

function distanceFilter(distanceMiles) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?distance=${distanceMiles}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
	});
}

function getLatAndLon(lat, lon) {
	const searchLatAndLon = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?lat=${lat}&lon=-${lon}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
		}
	};

	$.ajax(searchLatAndLon).done(function (response) {
		console.log(response);
		console.log(response.result.data[0].geo.lat);
		console.log(response.result.data[0].geo.lon);
	});
}

$("#menuSearchBtn").on("click", function(event) {
	event.preventDefault();

	// get the value of the input from user
	const searchMenuItem = $("#menuSearch").val().trim();
	
	// clear input box
	$(menuSearch).val("");

	distanceFilter(searchMenuItem);

});

function getMenuItems(menuSearchItem) {
	const menuSearch = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?q=${menuSearchItem}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
		}
	}
	
	$.ajax(menuSearch).done(function (response) {
		console.log(response);
		console.log(response.result.data[0].menu_item_name);

	});
}

    // // Creating a div to hold the restaurant_name
	// let restaurantDiv = $("<div class='restaurant'>");
	// // Storing the restaurant name
	// let restaurantName = response.restaurant_name;
	// // Creating an element to have the restaurant name displayed
	// let pOne = $("<p>").text("restaurant_name: " + Name);



// would like to add a search by city function
// need to hide initial landing page div and show everything else
// search field for type of food you're craving
// add a function to find menu items from the US-restaurant api based on the value of the zip code from the google api

/* 
need to add filters for seach results:
1. check if open
2. rating
3. top menu items
4. distance 
*/