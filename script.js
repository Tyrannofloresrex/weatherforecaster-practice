// Using cashtags in variables to remind me they're jQuery
var $cityList = $("#city-list");
var $citySearch = $("#city-search");
var $searchButton = $("#search-button");

var citiesArray = [""];

function renderCities() {
  $cityList.html("");

  for (let i = 0; i < citiesArray.length; i++) {
    var cities = citiesArray[i];
    var $li = $("<li>");

    $li.html(cities);
    $cityList.append($li);
    console.log(cities);

    $li.on("click", function () {
      var cityName = $(this).text();
      findWeather(cityName);
    });
  }
}

$searchButton.on("click", function () {
  
  var cityName = $citySearch.val();

  findWeather(cityName);
  if (cityName === "") {
    return;
  }

  citiesArray.push(cityName);
  $citySearch.val("");
  renderCities();
});

// // another way
// $("#current-display").html(`<div>
//     <div class='current-weather'>${currentWeather.main}</div>
//     <div class='current-weather'>${currentWeather.description}</div>
// </div>`);

function findWeather(cityName) {
  var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=d67d4ddd6295b0bc7f41e52d2c088ce4`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);

    $("#city-name").html(data.city.name);

    var fiveDayForecast = `<div class="fiveDayForecast">
            <div class = "dayOne"> Date: ${data.list[0].dt_txt} Temp: ${data.list[0].main.temp}  Humidity:${data.list[0].main.humidity}  Icon: <img src = "http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"></div>
            <div class = "dayTwo"> Date: ${data.list[8].dt_txt} Temp: ${data.list[8].main.temp}  Humidity:${data.list[8].main.humidity}  Icon: <img src = "http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png"></div>
            <div class = "dayThree"> Date: ${data.list[16].dt_txt} Temp: ${data.list[16].main.temp}  Humidity:${data.list[16].main.humidity}  Icon: <img src = "http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png"></div>
            <div class = "dayFour"> Date: ${data.list[24].dt_txt} Temp: ${data.list[24].main.temp}  Humidity:${data.list[24].main.humidity}  Icon: <img src = "http://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@2x.png"></div>
            <div class = "dayFive">Date: ${data.list[32].dt_txt} Temp: ${data.list[32].main.temp}  Humidity:${data.list[32].main.humidity}  Icon: <img src = "http://openweathermap.org/img/wn/${data.list[32].weather[0].icon}@2x.png"></div>
        </div>`;
    $("#fiveDayDisplay").html(fiveDayForecast);
    

    var moreURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.city.coord.lat}&lon=${data.city.coord.lon}&units=imperial&appid=d67d4ddd6295b0bc7f41e52d2c088ce4`;
    
    $.ajax({
      url: moreURL,
      method: "GET",
    }).then(function (moreData) {
      var currentForecast = `<div class= "currentForecast">
          <div class = "currentDay"> Date: ${data.list[0].dt_txt} Temp: ${moreData.current.temp}  Humidity:${moreData.current.humidity} Wind Speed: ${moreData.current.wind_speed}  Icon: <img src = "http://openweathermap.org/img/wn/${moreData.current.weather[0].icon}@2x.png"> UVI: ${moreData.current.uvi}</div>
        </div>`
        $("#current-display").html(currentForecast);
      console.log(moreData)

    })
  });
}
