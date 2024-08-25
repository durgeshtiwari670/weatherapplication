var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');

const apiKey = "a7f5e54ebfe37dd423c3eaec7195b691";

// Helper function to convert Kelvin to Celsius
function convertToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

// Function to display loading spinner
function showLoading() {
    city.innerHTML = 'Loading...';
    description.innerHTML = '';
    temp.innerHTML = '';
    wind.innerHTML = '';
}

// Function to handle errors
function showError(message) {
    city.innerHTML = '';
    description.innerHTML = '';
    temp.innerHTML = '';
    wind.innerHTML = '';
    alert(message);
}

btn.addEventListener('click', function() {
    const cityName = inputvalue.value.trim();

    if (cityName === "") {
        alert('Please enter a city name.');
        return;
    }

    showLoading(); // Show loading indicator

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const nameval = data.name;
            const weatherDesc = data.weather[0].description;
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;

            city.innerHTML = `Weather of <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${convertToCelsius(temperature)} °C</span>`;
            description.innerHTML = `Sky Condition: <span>${weatherDesc}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windSpeed} km/h</span>`;
        })
        .catch(err => {
            showError('Error fetching weather data. Please try again.');
        });
});
