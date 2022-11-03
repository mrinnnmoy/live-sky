import "./App.css";
import TopButtons from "./Components/TopButtons";
import Inputs from "./Components/Inputs";
import TimeAndLocation from "./Components/TimeAndLocation";
import TemperatureAndDetails from "./Components/TemperatureAndDetails";
import Forecast from "./Components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
  // To store data after being fetched.
  const [query, setQuery] = useState({ q: "Berlin" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // To check the fetched data in console
    // const fetchWeather = async () => {
    //   const data = await getFormattedWeatherData({q: "London"});
    //   console.log(data);
    // };

    // To accept Location from frontend
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    // Every time a new location is given, it fetches new data.
    fetchWeather();
  }, [query, units]);

  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs />

      {weather && (
        <div>
          <TimeAndLocation />
          <TemperatureAndDetails />
          <Forecast title="Hourly Forecast" />
          <Forecast title="Daily Forecast" />
        </div>
      )}
    </div>
  );
}

export default App;
