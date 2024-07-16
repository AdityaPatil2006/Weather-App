import { useState } from "react";
import "./App.css";
import cloud from "./assets/cloud.png";
import humidity from "./assets/humidity.png";
import wind from "./assets/wind.png";
import clear from "./assets/clear.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import drizzle from "./assets/drizzle.png";
import { useEffect } from "react";

const getWeatherData = async (BASE_URL) => {
  let response = await fetch(BASE_URL);
  return await response.json();
};

const getWeatherIcon = (data) => {
  switch (data.weather[0].main.toLowerCase()) {
    case "clear":
      return clear;
    case "rain":
      return rain;
    case "snow":
      return snow;
    case "clouds":
      return cloud;
    default:
      return snow;
  }
};

function App() {
  const [location, setLocation] = useState("London");
  const [data, setData] = useState({});
  const [weatherIcon, setWeatherIcon] = useState(snow);

  const API_KEY = "337f7512fe83b50c07737d61ccb7b270";
  const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  useEffect(() => {
    getWeatherData(BASE_URL).then((d) => {
      setData(d);
      console.log(data);
      let icon = getWeatherIcon(data);
      setWeatherIcon(icon);
    });
  }, [location]);

  return (
    <>
      <div className="bg-gradient-to-tl from-purple-700 to-pink-900 p-3 border rounded-3xl w-200px py-5 px-5">
        <h1 className="mb-10 font-bold font-mono">Weather Forecast</h1>
        <input
          type="text"
          value={location}
          placeholder="Search.."
          className="w-80 mb-4 px-3 py-2 border border-gray-300 rounded-full shadow-sm outline-none ring-2 ring-blue-500 bg-white text-black"
          onChange={(e) => {
            setLocation(e.target.value);
            console.log(e.target.value);
          }}
        />
        <button
          type="submit"
          className="x-4 py-1 bg-pink-900 text-white rounded-3xl shadow-sm hover:bg-pink-500 outline-none ring-2 ring-blue-500 ml-7 h-10"
        >
          Search
        </button>
        <div className="justify-center">
          <div className="inline-block justify-center">
            <img
              src={weatherIcon}
              alt=""
              srcset=""
              className="w-48 ml-2 inline-block drop-shadow-2xl"
              id="img"
            />
          </div>
          <div className="mt-2">
            <h1 className="font-bold text-7xl">
              {data.main?.temp
                ? Math.round(data.main?.temp - 273.15)
                : "Not Found"}
              °C
            </h1>
            <h2 className="font-semibold text-3xl">{data.name}</h2>
          </div>
        </div>
        <div className="flex justify-between mt-9">
          <div className="flex">
            <img
              src={humidity}
              alt=""
              srcset=""
              className="w-10 h-10 mt-3 ml-5"
            />
            <div className="ml-3">
              <h3 className="text-3xl">
                {data.main?.humidity ? data.main?.humidity : "Not Found"}%
              </h3>
              <p>Humidity</p>
            </div>
          </div>
          <div className="flex">
            <img src={wind} alt="" srcset="" className="w-10 h-10 mt-3 ml-5" />
            <div className="ml-3">
              <h3 className="text-3xl">
                {data.wind?.speed ? data.wind?.speed : "Not Found"} Km/hr
              </h3>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
