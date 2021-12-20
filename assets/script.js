//declaring VAR for manipulation
const inputValueEl = document.querySelector("#inputValue");
const cityTempEl = document.querySelector("#city-temp");
const cityWindEl = document.querySelector("#city-wind");
const cityNameEl = document.querySelector("#city-location");
const cityHumidityEl = document.querySelector("#city-humidity");
const cityUVEl = document.querySelector("#city-uv");
const buttonEl = document.querySelector("#search-btn");
const historyEl = document.querySelector("#search-bar");
const searchHistoryEl = document.querySelector('#search-history')
const fiveDayContainer = document.querySelector('#five-day-container')

//create a button, when button is clicked, set values
buttonEl.addEventListener("click", function () {
    const citylocation = inputValueEl.value;
    console.log("city name:" + citylocation);
    if (citylocation) {
        getWeatherData(citylocation);
        createHistory(citylocation);

    } else {
        alert("enter city");
        return
    }
});

const createHistory = (city) => {
    let storage = JSON.parse(localStorage.getItem('history'))
    if (storage === null) {
        storage =[]
    }
    storage.push(city)
    localStorage.setItem('history', JSON.stringify(storage))
    displayHistory()
}

const displayHistory = () => {
    let storage = JSON.parse(localStorage.getItem('history'))
    if (storage === null) {
        searchHistoryEl.textContent = 'No Search History'
    } else {
        searchHistoryEl.textContent = ''
        for (let i = 0; i < storage.length; i++) {
            let btn = document.createElement('button')
            btn.setAttribute('id', storage[i])
            btn.textContent = storage[i]
            searchHistoryEl.append(btn)

            btn.addEventListener('click', function(e) {
                getWeatherData(e.target.id)
            })
        }
    }
}
displayHistory()

//when button has been clicked, run API
const getWeatherData = function (city) {
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=ab90673bfce642f279c20bef69e4ce4c&units=metric'
    fetch(apiUrl).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data);

            const lat = data.coord.lat
            const lon = data.coord.lon

            displayForecast(lat, lon)

            cityNameEl.textContent = data.name

        
            cityHumidityEl.textContent = data.name

            cityWindEl.textContent = data.name
        })

}


const displayForecast = (lat, lon) => {
    const uviURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=ab90673bfce642f279c20bef69e4ce4c&units=metric';
    fetch(uviURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);

                fiveDayContainer.textContent =''
                const currentUvi = data.current.uvi;
                cityUVEl.textContent = currentUvi;

                if (currentUvi >= 7) {
                    cityUVEl.classList = "badge bg-danger";
                }
                else if (currentUvi < 7 && currentUvi > 2) {
                    cityUVEl.classList = "badge bg-warning";

                }
                else {
                    cityUVEl.classList = "badge bg-success";
                }

                for (let i = 0; i < 5; i++) {
                    let card = document.createElement('div')
                    card.setAttribute('class', 'card')
                    fiveDayContainer.append(card)

                    let date = document.createElement('h3')
                    date.textContent = moment().add(i + 1, 'days').format('dddd')
                    card.prepend(date)

                    let fiveDayTemp = document.createElement('p')
                    fiveDayTemp.textContent = 'Temp: ' + data.daily[i].temp.day
                    card.append(fiveDayTemp)

                    let cityHumidity = document.createElement('p') 
                    cityHumidity.textContent ='Humidity: ' + data.daily[i].humidity
                    card.append (cityHumidity)

                     let cityWind = document.createElement('p') 
                     cityWind.textContent ='Wind: '+ data.daily[i].wind_speed
                    card.append (cityWind)

                    




                }

            })
        }
    })


}


