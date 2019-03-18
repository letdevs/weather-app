window.addEventListener('load', () => {
    var lat;
    var long;

    let temperatureDescription = document.querySelector('.weather__upper-description');
    let temperatureDegree = document.querySelector('.weather__upper-temperature');
    let locationTimezone = document.querySelector('.weather__upper-timezone');
    let temperatureSection = document.querySelector('.weather__upper-temperature');
    let temperatureSpan = document.querySelector('weather__upper-degree span');
    let weatherUpper = document.querySelector('.weather__upper');
    let a = document.querySelector('.geoloc');

    let forecastTemp = document.querySelectorAll('.weather__lower-day .temp');
    let forecastIcon = document.querySelectorAll('.weather__lower-day .icon');
    let forecastDay = document.querySelectorAll('.weather__lower-day .day');

    let date = new Date();
    let day = date.getDay();

    a.addEventListener('change', function () {

        let cordinates = a.value;
        if (cordinates === 'Tokyo') {
            lat = 35.652832;
            long = 139.839478;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.15), rgba(25,62,78,.15)), url('/img/tokyo.png')";
        }
        if (cordinates === 'Spain') {
            lat = 41.294856;
            long = -4.055685;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.35), rgba(25,62,78,.35)), url('/img/spain.png')";
        }
        if (cordinates === 'Norway') {
            lat = 61.248333;
            long = 8.804821;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.35), rgba(25,62,78,.35)), url('/img/norway.png')";
        }

        if (cordinates === 'Austria') {
            lat = 48.210033;
            long = 16.363449;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.35), rgba(25,62,78,.35)), url('/img/austria.png')";
        }
        if (cordinates === 'Cairo') {
            lat = 30.06263;
            long = 31.24967;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.15), rgba(25,62,78,.15)), url('/img/cairo.png')";
        }
        if (cordinates === 'Istanbul') {
            lat = 41.015137;
            long = 28.979530;
            weatherUpper.style.backgroundImage = "linear-gradient(rgba(25,62,78,.15), rgba(25,62,78,.15)), url('/img/istanbul.png')";
        }
        if (cordinates === 'Germany') {
            lat = 51.133481;
            long = 10.018343;
            weatherUpper.style.backgroundImage = "";
        }

        if (day === 1) { //Monday
            forecastDay[0].textContent = 'Tuesday';
            forecastDay[1].textContent = 'Wednesday';
            forecastDay[2].textContent = 'Thursday';
            forecastDay[3].textContent = 'Friday';
        }
        if (day === 2) { //Tuesday
            forecastDay[0].textContent = 'Wednesday';
            forecastDay[1].textContent = 'Thursday';
            forecastDay[2].textContent = 'Friday';
            forecastDay[3].textContent = 'Saturday';
        }
        if (day === 3) { //Wednesday
            forecastDay[0].textContent = 'Thursday';
            forecastDay[1].textContent = 'Friday';
            forecastDay[2].textContent = 'Saturday';
            forecastDay[3].textContent = 'Sunday';
        }
        if (day === 4) { //Thursday
            forecastDay[0].textContent = 'Friday';
            forecastDay[1].textContent = 'Saturday';
            forecastDay[2].textContent = 'Sunday';
            forecastDay[3].textContent = 'Monday';
        }
        if (day === 5) { //Friday
            forecastDay[0].textContent = 'Saturday';
            forecastDay[1].textContent = 'Sunday';
            forecastDay[2].textContent = 'Monday';
            forecastDay[3].textContent = 'Tuesday';
        }
        if (day === 6) { //Saturday
            forecastDay[0].textContent = 'Sunday';
            forecastDay[1].textContent = 'Monday';
            forecastDay[2].textContent = 'Tuesday';
            forecastDay[3].textContent = 'Wednesday';
        }
        if (day === 0) { //Sunday
            forecastDay[0].textContent = 'Monday';
            forecastDay[1].textContent = 'Tuesday';
            forecastDay[2].textContent = 'Wednesday';
            forecastDay[3].textContent = 'Thursday';
        }

        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const api = `${proxy}https://api.darksky.net/forecast/bc5e5c5397421320a830213b641bd3ec/${lat},${long}`;

        fetch(api)
            .then(response => { // execute only if data are available
                return response.json(); //convert data into Json String

            })
            .then(data => {
                console.log(data);
                const {
                    temperature,
                    summary,
                    icon
                } = data.currently; 
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                const forecastMonday = data.daily.data[0];
                const forecastThuesday = data.daily.data[1];
                const forecastWednesday = data.daily.data[2];
                const forecastThursday = data.daily.data[3];
                const iconM = data.daily.data[0].icon;
                const iconT = data.daily.data[1].icon;
                const iconW = data.daily.data[2].icon;
                const iconTH = data.daily.data[3].icon;

                temperatureSection.textContent = Math.floor((temperature - 32) * (5 / 9)) + ' °C';
                forecastTemp[0].textContent = Math.floor((forecastMonday.temperatureMax - 32) * (5 / 9)) + ' °C';
                forecastTemp[1].textContent = Math.floor((forecastThuesday.temperatureMax - 32) * (5 / 9)) + ' °C';
                forecastTemp[2].textContent = Math.floor((forecastWednesday.temperatureMax - 32) * (5 / 9)) + ' °C';
                forecastTemp[3].textContent = Math.floor((forecastThursday.temperatureMax - 32) * (5 / 9)) + ' °C';


                // Celsius formula
                let celsius = (temperature - 32) * (5 / 9);
                setIcons(icon, document.querySelector('.icon'));
                setIcons(iconM, document.querySelector('.iconM'));
                setIcons(iconT, document.querySelector('.iconT'));
                setIcons(iconW, document.querySelector('.iconW'));
                setIcons(iconTH, document.querySelector('.iconTH'));

                //change temp to Celius/Fahrenheit

                temperatureSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "°C";
                        temperatureSection.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureSection.textContent = temperature;
                    }
                })

            });

        function setIcons(icon, iconID) { //skyscon functionality
            const skycons = new Skycons({
                color: 'white'
            });
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }


    })

});