var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var description = document.querySelector('#description');
var temp = document.querySelector('#temp');
var humidity = document.querySelector('#humidity');
var pressure = document.querySelector('#pressure');
var wind = document.querySelector('#wind');
var rain = document.querySelector('#rain');
var visibility = document.querySelector('#visibility');
var sunrise = document.querySelector('#sunrise');
var sunset = document.querySelector('#sunset');

const apiKey = "a7f5e54ebfe37dd423c3eaec7195b691";

// Helper function to convert Kelvin to Celsius
function convertToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
}

// Helper function to format timestamps to local time
function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
}

// Function to display loading spinner
function showLoading() {
    city.innerHTML = 'Loading...';
    description.innerHTML = '';
    temp.innerHTML = '';
    humidity.innerHTML = '';
    pressure.innerHTML = '';
    wind.innerHTML = '';
    rain.innerHTML = '';
    visibility.innerHTML = '';
    sunrise.innerHTML = '';
    sunset.innerHTML = '';
}

// Function to handle errors
function showError(message) {
    city.innerHTML = '';
    description.innerHTML = '';
    temp.innerHTML = '';
    humidity.innerHTML = '';
    pressure.innerHTML = '';
    wind.innerHTML = '';
    rain.innerHTML = '';
    visibility.innerHTML = '';
    sunrise.innerHTML = '';
    sunset.innerHTML = '';
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
            const humidityVal = data.main.humidity;
            const pressureVal = data.main.pressure;
            const windSpeed = data.wind.speed;
            const rainAmount = data.rain ? data.rain['1h'] : 0; // Check if rain data exists
            const visibilityVal = data.visibility / 1000; // Convert visibility to kilometers
            const sunriseTime = formatTime(data.sys.sunrise);
            const sunsetTime = formatTime(data.sys.sunset);

            // Determine the rain description
            let rainDescription = "No rain detected";
            if (rainAmount > 0 && rainAmount <= 2) {
                rainDescription = "Light rain";
            } else if (rainAmount > 2 && rainAmount <= 7) {
                rainDescription = "Moderate rain";
            } else if (rainAmount > 7) {
                rainDescription = "Heavy rain";
            }

            city.innerHTML = `Weather in <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${convertToCelsius(temperature)} °C</span>`;
            description.innerHTML = `Sky Condition: <span>${weatherDesc}</span>`;
            humidity.innerHTML = `Humidity: <span>${humidityVal}%</span>`;
            pressure.innerHTML = `Pressure: <span>${pressureVal} hPa</span>`;
            wind.innerHTML = `Wind Speed: <span>${windSpeed} km/h</span>`;
            rain.innerHTML = `Rain: <span>${rainAmount} mm (${rainDescription})</span>`;
            visibility.innerHTML = `Visibility: <span>${visibilityVal} km</span>`;
            sunrise.innerHTML = `Sunrise: <span>${sunriseTime}</span>`;
            sunset.innerHTML = `Sunset: <span>${sunsetTime}</span>`;
        })
        .catch(err => {
            showError('Error fetching weather data. Please try again.');
        });
});
