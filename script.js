// Select elements
const cityInput = document.getElementById('cityInput');
const fetchWeatherButton = document.getElementById('fetchWeather');
const weatherResult = document.getElementById('weatherResult');

// Your OpenWeatherMap API Key
const apiKey = "aa86f66bc57d9726d7ca6c3950b60157";  // Replace with your actual API key

// Function to fetch weather data
async function fetchWeather() {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    weatherResult.innerHTML = '<p class="text-red-500">Please enter a city name.</p>';
    return;
  }

  // Construct the API URL
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    // Fetch weather data
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    // Display weather information
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p class="text-red-500">${error.message}</p>`;
  }
}

// Function to display weather data
function displayWeather(data) {
  const { name, main, weather } = data;
  weatherResult.innerHTML = `
    <h2 class="text-xl font-semibold">${name}</h2>
    <p class="text-gray-700">Temperature: ${main.temp}°C</p>
    <p class="text-gray-700">Weather: ${weather[0].description}</p>
  `;
}

// Add event listener to button
fetchWeatherButton.addEventListener('click', fetchWeather);
