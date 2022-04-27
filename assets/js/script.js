var cityNameEl = document.querySelector("#city-name");
var submitBtnEl = document.querySelector("#submit");
var currentCity = document.querySelector("#current-city");
var currTemp = document.querySelector("#curr-temp");
var currWind = document.querySelector("#curr-wind");
var currHumidity = document.querySelector("#curr-humidity");
var currUvi = document.querySelector("#curr-uvi");
var cityHistoryEl = document.querySelector("#city-history");
var savedPlaces = [];

var getPlaceData = function (coord) {
  var lat = coord.lat;
  var long = coord.long;
  var placeName = coord.placeName;
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=minutely,hourly,alerts&units=imperial&appid=ffd54ea96bf3b94acf8e72a75c1d3667";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        currentCity.textContent = placeName;
        currTemp.textContent = data.current.temp;
        cityNameEl.value = "";
      });
    } else {
      alert("Something went wrong, please try again!");
    }
  });
};

var createHistoryBtn = function (savedPlace) {
  var lat = savedPlace.lat;
  var long = savedPlace.long;
  var city = savedPlace.placeName;
  var newPlaceBtn = document.createElement("button");

  newPlaceBtn.classList.add("button", "is-warning", "is-medium", "is-fullwidth", "is-light", "mt-2", "history-btn");
  newPlaceBtn.setAttribute("data-lat", lat);
  newPlaceBtn.setAttribute("data-long", long);
  newPlaceBtn.textContent = city;

  cityHistoryEl.prepend(newPlaceBtn);
};

var loadPlaces = function () {
  savedPlaces = localStorage.getItem("places");
  if (!savedPlaces) {
    return false;
  }

  savedPlaces = JSON.parse(savedPlaces);

    for (var i = savedPlaces.length - 5; i < savedPlaces.length; i++) {
      createHistoryBtn(savedPlaces[i]);
  }
};

var savePlace = function (obj) {
  if (!savedPlaces) {
    savedPlaces = [];
  }
  savedPlaces.push(obj);
  localStorage.setItem("places", JSON.stringify(savedPlaces));
};

var getPlace = function () {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" + cityNameEl.value + "&units=imperial&appid=ffd54ea96bf3b94acf8e72a75c1d3667";
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        var lat = data.coord.lat;
        var long = data.coord.lon;
        var placeName = data.name;
        var placeObj = { placeName, lat, long };
        savePlace(placeObj);
        cityHistoryEl.textContent = "";
        loadPlaces();
        getPlaceData(placeObj);
      });
    } else {
      alert("Enter a valid city!");
    }
  });
};

loadPlaces();

submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  getPlace();
});

cityHistoryEl.addEventListener("click", function(event){
  /*Needed to create placeObj again here so that I can call the
  getPlaceData function directly, and avoid putting the history button
  cities into local storage again.*/
  var lat = event.target.getAttribute("data-lat");
  var long = event.target.getAttribute("data-long");
  var placeName = event.target.textContent;
  var placeObj = {placeName, lat, long}

  getPlaceData(placeObj);
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
