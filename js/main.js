
let locationInput = document.querySelector('#findInput');
let findBtn = document.querySelector('#findBtn');
let weatherDisplay = document.getElementById('weatherDisplay');

findBtn.addEventListener('click', () => {
  getWeather(locationInput.value.trim());
});

locationInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') {
    getWeather(e.target.value.trim());
  }
});

async function getWeather(cityName) {
  if (cityName === "") return;

  try {
    weatherDisplay.innerHTML = `<p class="text-center">Loading...</p>`;
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c1f019f80a904a9cb34173745252906&q=${cityName}&days=3`);
    let data = await response.json();

    if (data.error) {
      weatherDisplay.innerHTML = `<h1 class="text-danger text-center">City not found!</h1>`;
      return;
    }

    displayData(data);
  } catch (error) {
    weatherDisplay.innerHTML = `<p class="text-danger text-center">Error fetching weather.</p>`;
  }
}

function displayData(weatherData) {
  let forecast = weatherData.forecast.forecastday;
  let cartona = ``;

  for (let i = 0; i < forecast.length; i++) {
    let dayData = new Date(forecast[i].date);
    let dayName = dayData.toLocaleString('en-us', { weekday: 'long' });
    let dayNum = dayData.getDate();
    let month = dayData.getMonth() + 1;
    let conditionText = forecast[i].day.condition.text;
    let conditionIcon = forecast[i].day.condition.icon;
    let maxTemp = forecast[i].day.maxtemp_c;
    let minTemp = forecast[i].day.mintemp_c;
    let city = weatherData.location.name;

    cartona += `
      <div class="item col-md-4">
        <h5>${dayName} - ${dayNum}/${month}</h5>
        <h6>${city}</h6>
        <img src="https:${conditionIcon}" alt="${conditionText}" />
        <h2>${maxTemp}°C</h2>
        <p>Min: ${minTemp}°C</p>
        <p>${conditionText}</p>
      </div>
    `;
  }

  weatherDisplay.innerHTML = cartona;
}




