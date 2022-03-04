import { useEffect, useState, useRef } from "react";
import "./App.css";
const apiKey = "7a4b489e3fe51986890eb742f83b0474";
const kelvinToCelsius = (degree) => degree - 273.15;
function App() {
  const [chosenCity, setChosenCity] = useState("Helsinki");
  const [weatherData, setWeatherData] = useState(null);
  const inputRef = useRef();
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${chosenCity}&appid=${apiKey}`;
    console.log(chosenCity);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
      });
  }, [chosenCity]);
  return (
    <div>
      <div className="searchBtn">
        <input type="text" id="cityName" ref={inputRef} />
        <button onClick={() => setChosenCity(inputRef.current.value)}>
          Hae
        </button>
      </div>
      <ul className="weather">
        <li className="city">
          {weatherData ? `${weatherData.name}` : "Lataa..."}
        </li>
        <li className="temp">
          {weatherData
            ? `${Math.round(kelvinToCelsius(weatherData.main.temp))} °C`
            : null}
        </li>
        <li className="tempRange">
          {weatherData
            ? `Ylin: ${Math.round(
                kelvinToCelsius(weatherData.main.temp_max)
              )} °C`
            : null}
        </li>
        <li className="tempRange">
          {weatherData
            ? `Alin: ${Math.round(
                kelvinToCelsius(weatherData.main.temp_min)
              )} °C`
            : null}
        </li>
        {/* <li className="rain">
          {weatherData ? `Lumisadetta: ${weatherData.snow["1h"]} mm` : null}
        </li> */}
        <li className="wind">
          {weatherData ? `Tuuli: ${weatherData.wind.speed} m/s` : null}
        </li>
      </ul>
    </div>
  );
}

export default App;
