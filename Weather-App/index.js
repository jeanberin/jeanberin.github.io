const form = document.getElementById('enter-form');
const inputLocation = document.getElementById('enter-location');

const infoContainer = document.querySelector('.weather-information-container');
const currentWeatherContainer = document.querySelector('.current-weather');
const todayContainer = document.querySelector('.today-card-container');
const airConditionContainer = document.querySelector('.air-condition-card-container');
const sevenDayContainer = document.querySelector('.seven-day-card-container');

const API_KEY = '624040f5490c460793f62034241009';


async function getWeatherForecast(location) {
    try {
        let API_LOC = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`;
        let response = await fetch(API_LOC);
        let weatherData = await response.json();
        console.log(weatherData);

        currentWeatherContainer.innerHTML = '';

        let currentMainHeading = document.createElement('div');
        currentMainHeading.setAttribute('class', 'current-main-heading');
        currentWeatherContainer.append(currentMainHeading);

        let currentWeatherText = document.createElement('div');
        currentWeatherText.setAttribute('class', 'current-weather-text');

        currentMainHeading.append(currentWeatherText);

        let city = document.createElement('p');
        city.setAttribute('id', 'city');
        city.textContent = `${weatherData.location.name}`;

        let chanceRain = document.createElement('p');
        chanceRain.setAttribute('id', 'chance-rain');
        chanceRain.textContent = `Chance of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%`;

        currentWeatherText.append(city);
        currentWeatherText.append(chanceRain);

        let currentImage = document.createElement('img');
        currentImage.src = `${weatherData.current.condition.icon}`;
        currentWeatherContainer.append(currentImage);

        currentMainHeading.append(currentImage);

        let currentTempC = document.createElement('p');
        currentTempC.setAttribute('id', 'current-tempC');
        currentTempC.textContent = `${Math.floor(weatherData.current.temp_c)}°C`;

        currentWeatherContainer.append(currentTempC);

        todayContainer.innerHTML = '';

        let numberOfHoursperDay = weatherData.forecast.forecastday[0].hour.length;

        // store weather today's weather condition every 4 hrs
        for (let i = 0; i <  numberOfHoursperDay; i += 4) {
            let todayCard = document.createElement('div');
            todayCard.setAttribute('class', 'today-card');

            let time = document.createElement('p');
            time.setAttribute('class', 'time');
            let textTime;
            
            let image = document.createElement('img');
            image.src = `${weatherData.forecast.forecastday[0].hour[i].condition.icon}`;

            let todayTempC = document.createElement('p');
            todayTempC.textContent = `${Math.floor(weatherData.forecast.forecastday[0].hour[i].temp_c)}°C`;
            todayTempC.setAttribute('class', 'today-tempC');


            if (i === 0) {
                textTime = document.createTextNode('12:00 AM');
                time.appendChild(textTime);
            } else if (i <= 11) {
                textTime = document.createTextNode(`${i}:00 AM`);
                time.appendChild(textTime);
            } else if (i === 12) {
                textTime = document.createTextNode(`${i}:00 PM`);
                time.appendChild(textTime);
            } else {
                textTime = document.createTextNode(`${i-12}:00 PM`);
                time.appendChild(textTime);
            }

            todayCard.append(time);
            todayCard.append(image);
            todayCard.append(todayTempC);
            todayContainer.append(todayCard);
        }

        let realFeel = Math.floor(weatherData.current.feelslike_c);
        let wind = weatherData.current.wind_kph;
        let rainChance = weatherData.forecast.forecastday[0].day.daily_chance_of_rain;
        let UV = weatherData.current.uv;
        
        airConditionContainer.innerHTML = '';

        let airConditionList = [realFeel, wind, rainChance, UV];

        for (let i = 0; i < airConditionList.length; i++) {
            let airConditionCard = document.createElement('div');
            airConditionCard.setAttribute('class', 'air-condition-card');

            airConditionContainer.append(airConditionCard);

            let titleAirConditionCard = document.createElement('div');
            titleAirConditionCard.setAttribute('class', 'title');

            airConditionCard.append(titleAirConditionCard);

            let infoAirCondition = document.createElement('p');
            infoAirCondition.setAttribute('class', 'info');
            if (i === 0) {
                titleAirConditionCard.innerHTML = '<i class="fa-solid fa-temperature-half"></i> Real Feel';
                infoAirCondition.textContent = `${airConditionList[i]}°C`;
            } else if (i === 1) {
                titleAirConditionCard.innerHTML = '<i class="fa-solid fa-wind"></i> Wind Feel';
                infoAirCondition.textContent = `${airConditionList[i]} km/h`;
            } else if (i === 2) {
                titleAirConditionCard.innerHTML = '<i class="fa-solid fa-droplet"></i> Chance of rain';
                infoAirCondition.textContent = `${airConditionList[i]}%`;
            } else {
                titleAirConditionCard.innerHTML = '<i class="fa-solid fa-sun"></i> UV Index';
                infoAirCondition.textContent = `${airConditionList[i]}`;
            }

            airConditionCard.append(infoAirCondition);
        }

        sevenDayContainer.innerHTML = '';

        const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        let dayCount = currentDay;


        for (let i = 0; i < weekday.length; i++) {
            let sevenDayCard = document.createElement('div');
            sevenDayCard.setAttribute('class', 'seven-day-card');
            sevenDayContainer.append(sevenDayCard);


            let day = document.createElement('p');
            day.setAttribute('class', 'day');
            sevenDayCard.append(day);

            let sevenDayWeatherContainer = document.createElement('div');
            sevenDayWeatherContainer.setAttribute('class', 'seven-day-weather-container');
            sevenDayCard.append(sevenDayWeatherContainer);

            let sevenDayWeatherImg = document.createElement('img');
            sevenDayWeatherContainer.append(sevenDayWeatherImg);

            let sevenDayWeatherText = document.createElement('p');
            sevenDayWeatherText.setAttribute('class', 'seven-day-weather');
            sevenDayWeatherContainer.append(sevenDayWeatherText);

            let maxminTempC = document.createElement('p');
            maxminTempC.setAttribute('class', 'max-min-tempC');
            sevenDayCard.append(maxminTempC);

            let maxTempC = document.createElement('span');
            maxTempC.setAttribute('class', 'max-tempC');
            maxminTempC.append(maxTempC);

            if (dayCount > weekday.length - 1) {
                dayCount = 0;
                console.log(weekday[dayCount]);
                day.textContent = `${weekday[dayCount]}`;
                
            } else if (dayCount === currentDay) {
                console.log('Today');
                day.textContent = 'Today';
                
            } else {
                console.log(weekday[dayCount]);
                day.textContent = `${weekday[dayCount]}`;
                
            }

            const weatherIcon = weatherData.forecast.forecastday[i].day.condition.icon;
            const weatherText = weatherData.forecast.forecastday[i].day.condition.text;
            const maxTempCText = Math.floor(weatherData.forecast.forecastday[i].day.maxtemp_c);
            const minTempCText = Math.floor(weatherData.forecast.forecastday[i].day.mintemp_c);

            sevenDayWeatherImg.src = `${weatherIcon}`;
            sevenDayWeatherText.textContent = `${weatherText}`;
            maxTempC.textContent = `${maxTempCText}`;
            maxminTempC.innerHTML += ` / ${minTempCText}`;
            dayCount++

        }



        

    }
    catch(error) {
        console.error(error);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeatherForecast(inputLocation.value);
    inputLocation.value = '';
})

getWeatherForecast('Manila');