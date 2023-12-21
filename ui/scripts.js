const getAllCities =  async () => {
    let cities = await fetch('http://localhost:3000/get-cities');
    let citiesParsed = await cities.json();
    console.log(citiesParsed);
    return citiesParsed;
}
getAllCities() // This function is called when app first loads, you will call this function in your JavaScript file. You might call it inside of another function.

const createSavedCity = async () => {
    let city = await fetch('http://localhost:3000/get-cities',{
    body:{city_name: userLocation}
});
let cityParsed = await city.json();
return cityParsed;
};

let search = document.querySelector("#searchButton");
let locationInput = document.querySelector("#inputLocationBox");
let temperatureTypeDiv = document.querySelector("#temp-type");
let headerText = document.querySelector("#three-day-forecast-header");
let highTempDay = document.querySelector("#hottest-day-info");

let today = {
    city: "",
    state: "",
    country: "",
    currentTemp: "",
    highTemp: "",
    lowTemp: "",
    chanceOfPrecipitation: ""
};

let threeDayForecast = [];
let dayOfWeek = [];
let fourDayForecastTemp = [];
let highestTempDay = 0;

search.addEventListener("click", function() {
    threeDayForecast = [];
    let userLocation = locationInput.value;
    console.log("clicked")
    createSavedCity();
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=a723218da53a464d8cf182437232609&q=${userLocation}&days=4`)
        .then(response => response.json()) 
        .then(data => {
            today.city = data.location.name;
            today.state = data.location.region;
            today.country = data.location.country;
            today.currentTemp = Math.round(data.current.temp_f);
            today.highTemp = Math.round(data.forecast.forecastday[0].day.maxtemp_f);
            today.lowTemp = Math.round(data.forecast.forecastday[0].day.mintemp_f);
            today.chanceOfPrecipitation = data.forecast.forecastday[0].day.daily_chance_of_rain;
            
            for (let i = 1; i < data.forecast.forecastday.length; i++) {
                let forecast = {
                    date: data.forecast.forecastday[i].date,
                    averageTemp: Math.round(data.forecast.forecastday[i].day.avgtemp_f),
                    highTemp: Math.round(data.forecast.forecastday[i].day.maxtemp_f),
                    lowTemp: Math.round(data.forecast.forecastday[i].day.mintemp_f),
                    chanceOfPrecipitation: data.forecast.forecastday[i].day.daily_chance_of_rain,
                    day: getDayOfWeek(data.forecast.forecastday[0,i].date)
                };
                threeDayForecast.push(forecast);

            }
            for (let i = 0; i <data.forecast.forecastday.length; i++) {
                let dayTempObj = {
                    dayOfWeek: getDayOfWeek(data.forecast.forecastday[i].date),
                    temp:data.forecast.forecastday[i].day.maxtemp_f,
                }
                fourDayForecastTemp.push(dayTempObj);
                }
            for (let i = 0; i<fourDayForecastTemp.length; i++) {
                if (fourDayForecastTemp[i].temp > highestTempDay) {
                highestTempDay = fourDayForecastTemp[i].dayOfWeek;
                }
                }
            updateUI();
            
        });
        
    });
        function updateUI() {
        document.querySelector("#todays-weather-header").textContent = "Today's Weather";
        
        document.querySelector("#city").textContent = today.city + ",";
        document.querySelector("#state").textContent = today.state;
        document.querySelector("#country").textContent = today.country;
        document.querySelector("#current-temp").textContent = today.currentTemp + "°F";
        document.querySelector("#high-temp").textContent = "Today's High: " + today.highTemp + "°F";
        document.querySelector("#low-temp").textContent = "Today's Low: " + today.lowTemp + "°F";
        document.querySelector("#chance-of-precipitation").textContent = "Chance of Rain: " + today.chanceOfPrecipitation + "%";
        document.querySelector(".todays-weather-container").classList.remove("hidden");
        document.querySelector(".forecast-header-container").classList.remove("hidden")
        document.querySelector(".hottest-day-container").classList.remove("hidden")

        highTempDay.textContent = "The Hottest day this week is " + highestTempDay;   

        headerText.textContent = "Three Day Forecast";
        let forecastList = document.querySelector(".three-day-weather-info");
        forecastList.innerHTML = "";

        for (let i = 0; i < threeDayForecast.length; i++) {
            let forecastItem = document.createElement("div");
            forecastItem.classList.add("forecast-box");
        
            let day = document.createElement("h3");
            day.textContent = threeDayForecast[i].day;
            forecastItem.appendChild(day);
        
            let temp = document.createElement("h1");
            temp.textContent = `${threeDayForecast[i].averageTemp}°F`;
            forecastItem.appendChild(temp);
        
            let highTemp = document.createElement("p");
            highTemp.textContent = `High Temp: ${threeDayForecast[i].highTemp}°F`;
            forecastItem.appendChild(highTemp);
        
            let lowTemp = document.createElement("p");
            lowTemp.textContent = `Low Temp: ${threeDayForecast[i].lowTemp}°F`;
            forecastItem.appendChild(lowTemp);
        
            let chanceOfPrecipitation = document.createElement("p");
            chanceOfPrecipitation.textContent = `Chance of Precipitation: ${threeDayForecast[i].chanceOfPrecipitation}%`;
            forecastItem.appendChild(chanceOfPrecipitation);
        
            forecastList.appendChild(forecastItem);


        };
        if (today.currentTemp > 80) {
            return temperatureTypeDiv.textContent = "Yuck! It's Hot Today!"
        } else if (today.currentTemp < 40) {
            return temperatureTypeDiv.textContent = "Hurray! It's Cold Today!"
        } else if (today.currentTemp > 100) {
            return temperatureTypeDiv.textContent = "Today's Weather is Nope!, Stay inside. It's giving global warming.";
        } else {
            return temperatureTypeDiv.textContent = "The Weather is Basic AF!"
        };
        

        
        };

        function getDayOfWeek(dateString) {
            const date = new Date(`${dateString}T00:00:00Z`);
            
            const utcOffsetMinutes = date.getTimezoneOffset();
            
            const californiaTime = new Date(date.getTime() + utcOffsetMinutes * 60000);
            
            const options = { weekday: 'long' };
            const formatter = new Intl.DateTimeFormat('en-US', options);
            
            return formatter.format(californiaTime);
        }

