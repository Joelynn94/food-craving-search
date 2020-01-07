// get the value of the city input from user
const zip = $("#searchZip").val().trim();

// get the value of the search input from user
const searchMenuItem = $("#menuSearch").val().trim();

function activatePlacesSearch() {
	let input = document.getElementById('searchZip');
	let autocomplete = new google.maps.places.Autocomplete(input, {types: ['(cities)']});

	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		let place = autocomplete.getPlace();
		console.log(place);
		let lat = place.geometry.location.lat();
		let lng = place.geometry.location.lng();

		getMenuItems(searchMenuItem, lat, lng)
	});
}

$("#searchZip").keypress(function(event) { 
	
	if (event.keyCode === 13) { 
		event.preventDefault();
		$("#searchBtn").click(); 
		$("#menuSearch").click();
	} 
}); 

$("#searchBtn").on("click", function(event) {
	event.preventDefault();
	
	// clear input box
	$("#searchZip").val("");

	// add class of hide to bg-primary
	$('.bg-primary').addClass('hide');

	// remove class of hide from second-display
	$('.second-display').removeClass('hide');
		
});

$("#menuSearchBtn").on("click", function(event) {
	event.preventDefault();
	
	// clear input box
	$(menuSearch).val("");

});

function getMenuItems(menuSearchItem, lat, lng) {
	const menuSearch = {
		"async": true,
		"crossDomain": true,
		"url": `https://us-restaurant-menus.p.rapidapi.com/menuitems/search?q=${menuSearchItem}&lat=${lat}&lon=${lng}&distance=10`,
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
			let col = $("<div>").addClass("col-md-3");
			let card = $("<div>").addClass("card bg-primary text-white");
			let body = $("<div>").addClass("card-body p-2");

			let title = $("<h5>").addClass("card-title").text("Restaurant Name: " + result[i].restaurant_name);

			// let img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

			let p1 = $("<p>").addClass("card-text").text("Food: " + result[i].menu_item_name);

			// merge together and put on page
			col.append(card.append(body.append(title, p1)));
			$("#display").append(col);

		}
	});
}

// function buildHTML(){
// 	// loop over all 
// 	for (var i = 0; i < data.list.length; i++) {
// 		// only look at forecasts around 3:00pm
// 		if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
// 			// create html elements for a bootstrap card
// 			var col = $("<div>").addClass("col-md-2");
// 			var card = $("<div>").addClass("card bg-primary text-white");
// 			var body = $("<div>").addClass("card-body p-2");

// 			var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());

// 			var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");

// 			var p1 = $("<p>").addClass("card-text").text("Temp: " + data.list[i].main.temp_max + " °F");
// 			var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

// 			// merge together and put on page
// 			col.append(card.append(body.append(title, img, p1, p2)));
// 			$("#forecast .row").append(col);
// 		}
// 	}	
// }

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


