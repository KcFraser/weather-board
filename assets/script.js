//declaring VAR for manipulation
const inputValueEl = document.querySelector(".inputValue");
const cityTempEl = document.querySelector(".city-temp");
const cityWindEl = document.querySelector(".city-wind");
const cityNameEl = document.querySelector(".city-location");
const cityHumidityEl = document.querySelector(".city-humidity");
const cityUVEl = document.querySelector(".city-uv");
const buttonEl = document.querySelector(".search-btn");
const historyEl = document.querySelector(".search-bar");

//create a button, when button is clicked, set values
buttonEl.addEventListener("click", function(){
const citylocation = inputValueEl.ariaValueMax.trim();
console.log ("city name:" + citylocation);
if (citylocation) {
    getWeatherData (citylocation);
    displayHistory (citylocation);

} else {
    alert ("enter city"); 
}
});
//when button has been clicked, run API
const getWeatherData = fuction(city) {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + 'ab90673bfce642f279c20bef69e4ce4c'



}


const displayMainStats = function (name,temp,wind,humidity,uvLat,uvLon,icon){
    const uviURL = 'api.openweathermap.org/data/2.5/weather?lat=' + uvLat + 'ab90673bfce642f279c20bef69e4ce4c';
    fetch(uviURL).then(function(response){
        if (response.ok){
            response.json().then (function(data){
                const currentUvi = data.current.uvi;

                if (currentUvi >= 7){
                    cityUVEl.classList = "badge bg-danger";
                    cityUVEl.textContent = currentUvi;
                }
                else if (currentUvi < 7 && currentUVI > 2){
                    cityUVEl.classList = "badge bg-warning";
                    cityUVEl.textContent = currentUvi;
                
                }  
                else {
                    cityUVEl.classList ="badge bg-succuess";
                    cityUVEl.textconetent =currentUvi;
                }
                
                displayFutureForcast (data);


        })
    }
})


}


