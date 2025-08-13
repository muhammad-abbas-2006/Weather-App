let getSearch = document.querySelector('#search');
let getTemp = document.getElementById('temp');
let getName = document.getElementById('name');
let getDate = document.getElementById('date'); 
let getTime = document.getElementById('time');
let getFeels = document.getElementById('feels-like');
let getHumidity = document.getElementById('humidity');
let getMon = document.getElementById('mon');
let getTue = document.getElementById('tue');
let getWed = document.getElementById('wed');
let getThus = document.getElementById('thus');
let getCurrdate = document.getElementById('C-date');
let dates = new Date();
let dayNameShort = dates.toLocaleString('default', { weekday: 'long' }); 

document.querySelector('#search-btn').addEventListener('click', () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getSearch.value}&units=metric&appid=ecf07bafe5f67fa8a66abd728beb563b`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: data.message || "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                });
            } else {
                // City name & temp
                getName.innerHTML = data.name;
                getTemp.innerHTML = `${data.main.temp}°C`;
                getFeels.innerHTML = `${data.main.feels_like}°C`;
                getHumidity.innerHTML = `${data.main.humidity}°C`;
                getCurrdate.innerHTML = dayNameShort;


                // Timezone offset in seconds
                const timezoneOffset = data.timezone;

                // Current UTC time
                const utcTime = new Date().getTime();

                // Local time according to that country
                const localTime = new Date(utcTime + timezoneOffset * 1000);

                // Day, Month, Time
                const day = localTime.getDate();
                const month = localTime.toLocaleString('default', { month: 'long' });
                const hours = localTime.getHours();
                const minutes = localTime.getMinutes().toString().padStart(2, '0');

                // Show in HTML
                if (getDate) getDate.innerHTML = `${day} ${month}`;
                if (getTime) getTime.innerHTML = `${hours}:${minutes}`;
            }
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Network error! Please try again later.",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        });

    getSearch.value = '';
});
