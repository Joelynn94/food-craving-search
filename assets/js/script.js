function getSettings(zip){
	return  {
		"async": true,
		"crossDomain": true,
		 "url": `https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/${zip}`,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
			"x-rapidapi-key": ""
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
	// setting the api url
	//let queryUrl = "https://us-restaurant-menus.p.rapidapi.com/restaurants/zip_code/" + zipCode;
	
	// clear input box
	$("#zipCode").val("");

	$.ajax(getSettings(zipCode)).then(res => console.log(res))
		
});