const url = `https://api.openweathermap.org/data/2.5/weather?`;
const apiKey = "20c155db497c8eb625ac45ef9d524405";

const btn = document.getElementById('search-btn');
const info = document.getElementById('weather-info');
const weatherImg = document.getElementById('weather-img');

const getWeatherData = async () => {
    try {
        const city = document.getElementById('inp-box').value;
        document.getElementById('error').innerText = '';
        const promise = await fetch(`${url}q=${city}&appid=${apiKey}&units=metric`);
        const response = await promise.json();
        if (city == '' || promise.status == 404) {
            info.classList.add('hidden');
            return document.getElementById('error').innerText = 'Please enter valid city name';
        } else {
            if (response.weather[0].main === 'Drizzle') {
                weatherImg.src = './images/drizzle.png'
            } else if (response.weather[0].main === 'Rain') {
                weatherImg.src = './images/rain.png'
            } else if (response.weather[0].main === 'Mist') {
                weatherImg.src = './images/mist.png'
            } else if (response.weather[0].main === 'Clouds') {
                weatherImg.src = './images/clouds.png'
            } else if (response.weather[0].main === 'Snow') {
                weatherImg.src = './images/rain.png'
            } else {
                weatherImg.src = './images/clear.png'
            }
            info.classList.remove('hidden');
            document.getElementById('temp').innerText = `${Math.floor(response.main.temp)}°c`;
            document.getElementById('city-name').innerText = `${response.name}`;
            document.getElementById('humidity').innerText = `${response.main.humidity}%`;
            document.getElementById('wind').innerText = `${response.wind.speed} km/h`;
            document.getElementById('inp-box').value = '';
        }
    } catch (error) {
        console.log(error);
    }
};

btn.addEventListener('click', getWeatherData);