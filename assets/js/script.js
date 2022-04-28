//general webpage variables
var cityNameEl = document.querySelector("#city-name");
var submitBtnEl = document.querySelector("#submit");
var cityHistoryEl = document.querySelector("#city-history");
var explainerEl = document.querySelector("#explainer");
//current city variables
var currWeatherEl = document.querySelector("#curr-weather");
var currCityEl = document.querySelector("#curr-city");
var currDtEl = document.querySelector("#curr-dt");
var currIconEl = document.querySelector("#curr-icon");
var currTempEl = document.querySelector("#curr-temp");
var currWindEl = document.querySelector("#curr-wind");
var currHumidEl = document.querySelector("#curr-humid");
var currUviEl = document.querySelector("#curr-uvi");
//First future day variables
var futDt1El = document.querySelector("#fut-dt-1");
var futIcon1El = document.querySelector("#fut-icon-1");
var futTemp1El = document.querySelector("#fut-temp-1");
var futWind1El = document.querySelector("#fut-wind-1");
var futHumid1El = document.querySelector("#fut-humid-1");
//Second future day variables
var futDt2El = document.querySelector("#fut-dt-2");
var futIcon2El = document.querySelector("#fut-icon-2");
var futTemp2El = document.querySelector("#fut-temp-2");
var futWind2El = document.querySelector("#fut-wind-2");
var futHumid2El = document.querySelector("#fut-humid-2");
//Third future day variables
var futDt3El = document.querySelector("#fut-dt-3");
var futIcon3El = document.querySelector("#fut-icon-3");
var futTemp3El = document.querySelector("#fut-temp-3");
var futWind3El = document.querySelector("#fut-wind-3");
var futHumid3El = document.querySelector("#fut-humid-3");
//Fourth future day variables
var futDt4El = document.querySelector("#fut-dt-4");
var futIcon4El = document.querySelector("#fut-icon-4");
var futTemp4El = document.querySelector("#fut-temp-4");
var futWind4El = document.querySelector("#fut-wind-4");
var futHumid4El = document.querySelector("#fut-humid-4");
//Fifth future day variables
var futDt5El = document.querySelector("#fut-dt-5");
var futIcon5El = document.querySelector("#fut-icon-5");
var futTemp5El = document.querySelector("#fut-temp-5");
var futWind5El = document.querySelector("#fut-wind-5");
var futHumid5El = document.querySelector("#fut-humid-5");

var savedPlaces = [];

//sets the forcasted data for the next 5 days
var getFutureWeather = function (data) {
  //day 1 forecast
  futDt1El.textContent = new Date(data.daily[1].dt * 1000).toLocaleDateString();
  futIcon1El.setAttribute("src","https://openweathermap.org/img/wn/" +data.daily[1].weather[0].icon +"@2x.png");
  futTemp1El.textContent = Math.round(data.daily[1].temp.max);
  futWind1El.textContent = data.daily[1].wind_speed + " MPH";
  futHumid1El.textContent = data.daily[1].humidity + "%";
  //day 2 forecast
  futDt2El.textContent = new Date(data.daily[2].dt * 1000).toLocaleDateString();
  futIcon2El.setAttribute("src","https://openweathermap.org/img/wn/" +data.daily[2].weather[0].icon +"@2x.png");
  futTemp2El.textContent = Math.round(data.daily[2].temp.max);
  futWind2El.textContent = data.daily[2].wind_speed + " MPH";
  futHumid2El.textContent = data.daily[2].humidity + "%";
  //day 3 forecast
  futDt3El.textContent = new Date(data.daily[3].dt * 1000).toLocaleDateString();
  futIcon3El.setAttribute("src","https://openweathermap.org/img/wn/" +data.daily[3].weather[0].icon +"@2x.png");
  futTemp3El.textContent = Math.round(data.daily[3].temp.max);
  futWind3El.textContent = data.daily[3].wind_speed + " MPH";
  futHumid3El.textContent = data.daily[3].humidity + "%";
  //day 4 forecast
  futDt4El.textContent = new Date(data.daily[4].dt * 1000).toLocaleDateString();
  futIcon4El.setAttribute("src","https://openweathermap.org/img/wn/" +data.daily[4].weather[0].icon +"@2x.png");
  futTemp4El.textContent = Math.round(data.daily[4].temp.max);
  futWind4El.textContent = data.daily[4].wind_speed + " MPH";
  futHumid4El.textContent = data.daily[4].humidity + "%";
  //day 5 forecast
  futDt5El.textContent = new Date(data.daily[5].dt * 1000).toLocaleDateString();
  futIcon5El.setAttribute("src","https://openweathermap.org/img/wn/" +data.daily[5].weather[0].icon +"@2x.png");
  futTemp5El.textContent = Math.round(data.daily[5].temp.max);
  futWind5El.textContent = data.daily[5].wind_speed + " MPH";
  futHumid5El.textContent = data.daily[5].humidity + "%";
}

//uses geo coordinates from current weather api to get weather data from oneCall api
var getPlaceData = function (coord) {
  var lat = coord.lat;
  var long = coord.long;
  var placeName = coord.placeName;
  var apiUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" +lat +"&lon=" +long +"&exclude=minutely,hourly,alerts&units=imperial&appid=ffd54ea96bf3b94acf8e72a75c1d3667";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {//gets and sets current weather data
        currCityEl.textContent = placeName;
        currDtEl.textContent = "("+ new Date(data.current.dt * 1000).toLocaleDateString() + ")";
        currIconEl.setAttribute("src","https://openweathermap.org/img/wn/" +data.current.weather[0].icon +"@2x.png");
        currTempEl.textContent = Math.round(data.current.temp);
        currWindEl.textContent = data.current.wind_speed + " MPH";
        currHumidEl.textContent = data.current.humidity + "%";
        currUviEl.textContent = data.current.uvi;

        if(data.current.uvi <= 2){
          currUviEl.className = "";
          currUviEl.classList.add("has-background-success");
        }else if (data.current.uvi <= 7) {
          currUviEl.className = "";
          currUviEl.classList.add("has-background-warning");
        }else{
          currUviEl.className = "";
          currUviEl.classList.add("has-background-danger");
        }

        //hides and shows panels to hide empty values before apis are called.
        explainerEl.classList.add("is-hidden");
        currWeatherEl.classList.remove("is-hidden");
        cityNameEl.value = "";
        getFutureWeather(data);
      });
    } else {
      alert("Something went wrong, please try again!");
    }
  });
};

//creates history button from localStorage values and single searches
var createHistoryBtn = function (savedPlace) {
  var lat = savedPlace.lat;
  var long = savedPlace.long;
  var city = savedPlace.placeName;
  var newPlaceBtn = document.createElement("button");

  newPlaceBtn.classList.add(
    "button",
    "is-warning",
    "is-medium",
    "is-fullwidth",
    "is-light",
    "mt-2",
    "history-btn"
  );

  //sets data attributes on button so that city history buttons
  //can be searched again by clicking on them, but it won't put
  //those values into localStorage since they are already there.
  newPlaceBtn.setAttribute("data-lat", lat);
  newPlaceBtn.setAttribute("data-long", long);
  newPlaceBtn.textContent = city;

  //used prepend to make history buttons appear in proper order
  cityHistoryEl.prepend(newPlaceBtn);
};

//pulls places from localStorage and allows the last 9 most recent
//searches to be seen on history.
var loadPlaces = function () {
  savedPlaces = localStorage.getItem("places");
  if (!savedPlaces) {
    return false;
  }

  savedPlaces = JSON.parse(savedPlaces);

  if (savedPlaces.length > 9) {//needed to make sure i doesn't go negative
    for (var i = savedPlaces.length - 9; i < savedPlaces.length; i++) {
      createHistoryBtn(savedPlaces[i]);
    }
  } else {
    for (var i = 0; i < savedPlaces.length; i++) {
      createHistoryBtn(savedPlaces[i]);
    }
  }
};

//saves place into localStorage
var savePlace = function (obj) {
  if (!savedPlaces) {
    savedPlaces = [];
  }
  savedPlaces.push(obj);
  localStorage.setItem("places", JSON.stringify(savedPlaces));
};

//gets geocoordinates used by getPlaceData
var getPlace = function () {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityNameEl.value +
    "&units=imperial&appid=ffd54ea96bf3b94acf8e72a75c1d3667";
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
    } else {//error handling in case input is invalid
      alert("Enter a valid city!");
    }
  });
};

//loads history buttons on page loading, if they exist in localStorage
loadPlaces();

//listens for city to be searched
submitBtnEl.addEventListener("click", function (event) {
  event.preventDefault();
  getPlace();
});

//listens for click on history button, uses attributes to make sure only
//button clicks activate api call
cityHistoryEl.addEventListener("click", function (event) {
  //Needed to create placeObj again here so that I can call the
  //getPlaceData function directly, and avoid putting the history button
  //cities into local storage again.
  var lat = event.target.getAttribute("data-lat");
  var long = event.target.getAttribute("data-long");
  var placeName = event.target.textContent;
  var placeObj = { placeName, lat, long };
  //checks to make sure only button clicks call the API.
  if(event.target.hasAttribute("data-lat")){
    getPlaceData(placeObj);
  }
});
