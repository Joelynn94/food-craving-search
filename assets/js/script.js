function getSettings(zip){
	return  {
		"async": true,
		"crossDomain": true,
		 "url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": "ae4b491594mshe5191aa0d24709dp16f364jsnbd5633bebe54"
		}
	}
}

$("#zipCode").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
	} 
}); 

$("#searchBtn").on("click", function() {
	event.preventDefault();
	
	// get the value of the input from user
	const zipCode = $("#zipCode").val();

	
	// clear input box
	$("#zipCode").val("");

	$.ajax(getSettings(zipCode)).then(res => console.log(res))

	const apiKey = "&key=AIzaSyB9M0pMrT9MNbhJm3B8GdtR5sffF_feCsg";
	// setting the api url
	let queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?&" + "components=postal_code:" + zipCode + apiKey;


	$.ajax({
		url: queryUrl
	}).then(function(response) {

		console.log(response);
	})
		
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