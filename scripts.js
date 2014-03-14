var weather;
var lat;
var lon;
var city;
$(function() {
			// write a function to go get the weather

			var goGetTheWeather = function(city){
				var encodedCity = encodeURI(city);
				$.ajax('http://api.wunderground.com/api/a637745210e001ef/conditions/q/'+ encodedCity +'.json',{
					type : 'GET',
					dataType : 'jsonp',
					success : function(data){
						//if there is no data observation
						// ! means if there is no (not)
						console.log(data);
						if(!data.current_observation) {
							$('h1.weather').text("Please be more specific");
							return false; //abandon all ship
						}

						var w = data.current_observation;
						weather = w.weather;
						var location = w.display_location.full;
						var tempF = w.temp_f;
						var tempC = w.temp_c;
						lat = w.observation_location.latitude;
						lon = w.observation_location.longitude;
						var locString = location;
						var weatherString = weather;
						var tempString = tempF + " F" + " / " + tempC + " C";
						$("p.location").text(locString);
						$("p.weather").text(weatherString);
						$("p.tempFC").text(tempString);
						getTwit();
			} //object close


		}); //end ajax
	
	}; //end function weatherFeels

	

	$(".cityForm").on("submit", function(e){
			e.preventDefault();
			city = $('input[name="city"]').val();
			goGetTheWeather(city);

	}); //end Form stuff

	var getTwit = function(){
		$.ajax("http://noauth.jit.su/1.1/search/tweets.json?q=" + weather + "&geocode=" + lat +  "," + lon + "," + "50mi" + "&count=20" + "&result_type=popular" + "%23dlws",{
			type : 'GET',
			dataType : 'jsonp',
			success : function(twitterdata){
				if(!twitterdata.statuses) {
					$('h1').text("Oh such sad, this city doesn't tweet enough. But you can still see the weather...");
					return false; //abandon all ship
				}
				console.log(twitterdata);
					var t = twitterdata.statuses;
					var tweet = t[Math.floor((Math.random()*t.length))].text;
					$("h1").fadeIn("slow", function(){
						$("h1").text(tweet);
						$("h1").addClass("h1Back");
					}); //fadeIn tweet
					var googlePhoto = "http://maps.googleapis.com/maps/api/streetview?size=1000x800&location=" + encodeURI(city) + "&sensor=false&fov=120&pitch=10";
					console.log(googlePhoto);
				$("body").css({
					"background-image": "url(" + googlePhoto + ")",
					"background-size" : "cover",
					"background-position" : "center",
					"background-repeat" : "no-repeat",
					
				})
			} // function(twitterdata) 
		}); //end twit ajax
	}; // getTwit
}); //document ready


// SHOULD WE NEED AN IF STATEMENT ONE DAY... THIS IS WRITTEN

// if( weather === "Overcast" || weather === "Mostly Cloudy"){
// 	$(".images img").attr( "src" , "http://flickholdr.com/200/200/");
// } // if overcast
// else if( weather === "Clear" ) {
// 	$(".images img").attr("src" , "http://flickholdr.com/200/200/sky");
// } // clear
// else if( weather === "Light Snow" ) {
// 	$(".images img").attr("src" , "http://flickholdr.com/200/200/sea,sun");
// } // light snow
// else if( weather === "Light Drizzle || Light Rain" ) {
// 	$(".images img").attr("src" , "http://flickholdr.com/200/200/sea,sun");
// } // light snow
// else {
// 	return false;
// }//return false



