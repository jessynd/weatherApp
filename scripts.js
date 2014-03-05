var weather;
var lat;
var lon;
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
			var city = $('input[name="city"]').val();
			goGetTheWeather(city);

	}); //end Form stuff

	var getTwit = function(){
		$.ajax("http://noauth.jit.su/1.1/search/tweets.json?q=" + weather + "&geocode=" + lat +  "," + lon + "," + "50mi" + "&count=5",{
			type : 'GET',
			dataType : 'jsonp',
			success : function(twitterdata){
				if(!twitterdata.statuses) {
					$('h1').text("Oh such sad, this city doesn't tweet enough. But you can still see the weather...");
					return false; //abandon all ship
				}
				console.log(twitterdata);
					var t = twitterdata.statuses;
					var tweet = t[0].text;
					$("h1").fadeIn("slow", function(){
						$("h1").text(tweet);
						$("h1").addClass("h1Back");
					}); //fadeIn tweet
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



