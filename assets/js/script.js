let menuFn = null

function activatePlacesSearch() {
	let input = document.getElementById('searchCity');
	let autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		let place = autocomplete.getPlace();
		console.log(place);
		let lat = place.geometry.location.lat();
		let lng = place.geometry.location.lng();

		menuFn = menuThing(lat, lng)
	});
}

$("#searchCity").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
		$("#menuSearch").click();
	} 
}); 

$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	
	// clear input box
	$("#searchCity").val("");

	// add class of hide to bg-primary
	$('.bg-primary').addClass('hide');

	// remove class of hide from second-display
	$('.second-display').removeClass('hide');
		
});

$("#menuSearchBtn").on("click", function(event) {
	event.preventDefault();
	
	menuFn($(menuSearch).val())

	// clear input box
	$(menuSearch).val("");

});

function menuThing (lat, lng) {
	return function (item) {
		const menuSearch = {
			"async": true,
			"crossDomain": true,
			"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?q=${item}&lat=${lat}&lon=${lng}&distance=10`,
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
				"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
			}
		}
		
		$.ajax(menuSearch).done(function (response) {
			console.log(response);
	
			let result = response.result.data;
			for(let i = 0; i < result.length; i++){
				console.log(result[i])
				console.log(result[i].restaurant_name)
				console.log(result[i].menu_item_name)
	
				// create html elements for a bootstrap card
				let col = $("<div>").addClass("col-md-4");
				let card = $("<div>").addClass("card mt-3 mb-3 bg-light");
				let body = $("<div>").addClass("card-body p-4");
	
				let title = $("<h5>").addClass("card-title text-dark pb-3 pt-2").text("Restaurant Name: " + result[i].restaurant_name);
	
				let img = $("<img>").attr("src", "assets/img/vintage-restaurant.jpg");
	
				let p1 = $("<p>").addClass("card-text text-info pt-3 pb-2").text("Food: " + result[i].menu_item_name);
	
				// merge together and put on page
				col.append(card.append(body.append(title, img, p1)));
				$("#display").append(col);
	
			}
		});
	}
}

// would like to add a search by city function
// need to hide initial landing page div and show everything else
// search field for type of food you're craving

/* 
need to add filters for seach results:
1. check if open
2. rating
3. top menu items
4. distance 
*/


