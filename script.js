const container = document.createElement("div");
container.classList.add("container");
document.body.append(container);

const row = document.createElement("div");
row.classList.add("row");
container.append(row);


fetch("https://restcountries.com/v3.1/all")
  .then((data) => data.json())
  .then((ele) => {
    for (let i = 0; i < ele.length; i++) {
      let col = document.createElement("div");
      col.classList.add("col-lg-4", "col-sm-12");
      row.append(col);
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("card1");
      cardDiv.innerHTML = `
        <div class="card">
        <div class="some-class"></div>
           <h1 id="title" class="text-center">${ele[i].name.common}</h1>
           <img src="${ele[i].flags.png}" class="card-img-top" alt="country-flag">
          <div class="card-body">
            <div class="card-text"><b>Capital: ${ele[i].capital}</b></div>
            <div class="card-text"><b>Region: ${ele[i].region}</b></div>
            <div class="card-text"><b>Country Code: ${ele[i].latlng}</b></div>
            <div class="card-text"><b>Country Code: ${ele[i].cca2}</b></div>
            <button class="btn btn-primary" onclick="getWeatherData('${ele[i].name.common}', ${i})">Click Here for weather</button>
            <p class="weatherInfo-${i}"></p>
            <div class="some-class"></div>
          </div>    
        </div>
    </div>`;
      col.append(cardDiv);
    }
  });

function getWeatherData(restCountryName, index) {
  let apiKey = "2e058a5c986acfe99cac939f7633466c";
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${restCountryName}&appid=${apiKey}`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((weatherData) => {
      var weatherCountryName = weatherData.name;
      const weatherInformation = document.querySelector(`.weatherInfo-${index}`);
      
      if (weatherCountryName === restCountryName) {
        weatherInformation.innerHTML = `
          Weather in ${weatherData.name}, ${weatherData.sys.country}: ${weatherData.main.temp_min} min°C and ${weatherData.main.temp_max} max°C
        `;
      } else {
        weatherInformation.innerHTML = `Country names do not match.`;
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data.");
    });
}