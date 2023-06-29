const search = document.querySelector('.search')
const city = document.querySelector('.city');
const country= document.querySelector('.country');
const value = document.querySelector('.value');
const desc = document.querySelector('.desc');
const visibility = document.querySelector('.visibility span');
const wind = document.querySelector('.wind span');
const sun = document.querySelector('.sun span');
const time = document.querySelector('.time');
const content = document.querySelector('.content');
const bodyE = document.querySelector('body');
const weather = document.querySelector('.weather');

function changeWeatherUI(){
    let capitalValue = search.value.trim()
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalValue ? capitalValue : 'Ha noi' }&units=metric&appid=d78fd1588e1b7c0c2813576ba183a667`

    fetch(apiUrl)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            if(data.cod === 200) {
                content.classList.remove('hide')
                city.innerText = data.name
                country.innerText = data.sys.country
                visibility.innerText = data.visibility + 'm'
                wind.innerText = data.wind.speed + 'm/s'
                sun.innerText = data.main.humidity + '%'
                let temp = Math.round(data.main.temp)
                value.innerHTML =  temp + '<sup>o</sup>C'
                desc.innerText = data.weather[0].main
                time.innerText = new Date().toLocaleString()

                if (temp > 28) {
                    bodyE.style.background = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(./img/hot.jpg) no-repeat center/cover';
                    weather.style.background = 'url(./img/hot.jpg) no-repeat center/cover';
                    // time.style.color = '#000';
                }else if (temp < 20) {
                    bodyE.style.background = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(./img/cold.jpg) no-repeat center/cover';
                    weather.style.background = 'url(./img/cold.jpg) no-repeat center/cover';
                }else {
                    bodyE.style.background = 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)), url(./img/warm.jpg) no-repeat center/cover';
                    weather.style.background = 'url(./img/warm.jpg) no-repeat center/cover';
                }

            }else {
                content.classList.add('hide')
                setTimeout(function() {
                    alert('Error!, not found, maybe you write wrong name')
                }, 1000)
            }
        })
        
}

changeWeatherUI()

search.addEventListener('keypress', function(e){
    if (e.code === 'Enter'){
        changeWeatherUI()
    }
})
search.addEventListener('change', function(e){
        changeWeatherUI()
})