class Weather {
    constructor(cityElement, tempElement, descriptionElement, humidityElement,
            windElement, weatherImageElement, searchBarElement, weatherElement) {
        this.cityElement = cityElement
        this.tempElement = tempElement
        this.humidityElement = humidityElement
        this.descriptionElement = descriptionElement
        this.windElement = windElement
        this.weatherImageElement = weatherImageElement
        this.searchBarElement = searchBarElement
        this.weatherElement = weatherElement
        this.key = '1416bb07f04634674810661bfdde4e97'
        this.data = null
        this.fetchWeather('london')
    }
    fetchWeather(city) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.key}&units=metric`)
        .then(response => response.json())
        .then(data => this.displayWeather(data))
    }

    displayWeather(data) {
        this.cityElement.innerText = `Weather in ${data["name"]}`
        // ${this.data["weather"][0]["main"]}
        this.tempElement.innerText = `${data["main"]["temp"]}°C`
        this.descriptionElement.innerText = data["weather"][0]["description"]
        this.humidityElement.innerText = `Humidity: ${data["main"]["humidity"]}%`
        this.windElement.innerText = `WindSpeed: ${data["wind"]["speed"]} km/h`
        this.weatherImageElement.src = `https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}.png`
        this.weatherElement.classList.remove('loading')
        document.body.style.backgroundImage = `url(https://source.unsplash.com/random/1920x1080)`
    }
}

const weatherElement = document.querySelector('.weather')
const cityElement = document.querySelector('.city')
const tempElement = document.querySelector('.temp')
const descriptionElement = document.querySelector('.description')
const humidityElement = document.querySelector('.humidity')
const windElement = document.querySelector('.wind')
const weatherImageElement = document.querySelector('#weather-image')
const searchBarElement = document.querySelector('.search-bar')
const searchBtnElement = document.querySelector('#search')

let weather = new Weather(cityElement, tempElement, descriptionElement, humidityElement,
    windElement, weatherImageElement, searchBarElement, weatherElement)

searchBtnElement.addEventListener('click', () => {
        let city = searchBarElement.value
        weather.fetchWeather(city)
    // weather.displayWeather()
})