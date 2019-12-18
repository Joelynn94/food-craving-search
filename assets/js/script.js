var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://us-restaurant-menus.p.rapidapi.com/menuitems/search?distance=10&lat=41.4993&page=1&q=tacos&lon=-81.6944",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "us-restaurant-menus.p.rapidapi.com",
		"x-rapidapi-key": "bc537ea7d1msh93abd71cf6a16a9p1cc331jsn99a8e1f89000"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});