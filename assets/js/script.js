var cityNameEl = document.querySelector("#city-name");
var submitBtnEl = document.querySelector("#submit");
var currentCity = document.querySelector("#current-city");
var currTemp = document.querySelector("#curr-temp");
var currWind = document.querySelector("#curr-wind");
var currHumidity = document.querySelector("#curr-humidity");
var currUvi = document.querySelector("#curr-uvi");

submitBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityNameEl.value+"&units=imperial&appid=ffd54ea96bf3b94acf8e72a75c1d3667";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data) {
            console.log(data.coord);
            currentCity.textContent = data.name;
            currTemp.textContent = data.main.temp;
            });
        }
    })

})

/*
  fetch(apiUrl)
    .then(function (response) {
      //request successful
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub User Not Found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to GitHub");
    });
*/
// var autocomplete;

// var onPlaceChanged = function() {
//     var place = autocomplete.getPlace();

//     if(!place.geometry){
//         //user didn't select prediction; reset the input field
//         cityNameEl.placeholder = "Enter a place";
//     } else {
//         //display details about the valid place
//         console.log(place.name);
//     }
// }

// var initAutocomplete = function() {
//     autocomplete = new google.maps.places.Autocomplete(cityNameEl,
//     {
//         types: ["cities"],
//         componentRestrictions: {"country" : ["US"]},
//         fields: ["place_id", "geometry", "name"]
//     });
//     autocomplete.addEventListener("place_changed", onPlaceChanged);
// }






var getWeatherData = function(){
    var apiUrl
};