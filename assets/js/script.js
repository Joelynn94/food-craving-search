function activatePlacesSearch() {
	let input = document.getElementById('zipCode');
	let autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		let place = autocomplete.getPlace();
		console.log(place.formatted_address);
		console.log(place.url);
		console.log(place.id);
		console.log(place);
	})
}

function activatePlacesServices() {
	let service = new google.maps
}


$("#zipCode").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
		$("#menuSearchBtn").click();
	} 
}); 

$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	
	// get the value of the input from user
	const zipCode = $("#zipCode").val();

	// clear input box
	$("#zipCode").val("");

	// ajax call using XYZmenus api
	const searchZipCode = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zipCode}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "ae4b491594mshe5191aa0d24709dp16f364jsnbd5633bebe54"
		}
	}

	$.ajax(searchZipCode).done(function (response) {
		console.log(response);
	});

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://us-restaurant-menus.p.rapidapi.com/menuitems/search?distance=10&q=pizza",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
		}
	}
	
	$.ajax(settings).done(function (response) {
		console.log(response);
	});

	/*
	// ajax call using Google api
	const apiKey = "&key=" + "AIzaSyB9M0pMrT9MNbhJm3B8GdtR5sffF_feCsg";
	// setting the api url
	let zipUrl = "https://maps.googleapis.com/maps/api/geocode/json?&" + "components=postal_code:" + zipCode + apiKey;

	$.ajax({
		url: zipUrl
	}).then(function(response) {
		console.log(response);
	})
	*/
	let placesDetails = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyB9M0pMrT9MNbhJm3B8GdtR5sffF_feCsg"
	$.ajax({
		url: placesDetails,
		method: "GET"
	}).then(function(response) {
		console.log(response);
	})

		
});


$("#menuSearchBtn").on("click", function(event) {
	event.preventDefault();

	// get the value of the input from user
	const menuSearch = $("#menuSearch").val();
	
	// clear input box
	$(menuSearch).val("");

	const menuSearchItem = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?q=${menuSearch}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
		}
	}
	
	$.ajax(menuSearchItem).done(function (response) {
		console.log(response);
	});

});


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