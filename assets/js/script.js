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
	});
}

// search field for type of food you're craving

/* 
need to add filters for seach results:
1. check if open
2. rating
3. top menu items
4. distance 
*/


