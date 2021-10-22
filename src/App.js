import React, { useEffect, useState } from "react";
import EditableSection from "./EditableSection";
import WeatherCard from "./WeatherCard";
import "./styles/App.css";
import data from "public/test-data.json";

const App = () => {

  const [weatherData, setWeatherData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [location, setLocation] = useState("");


  const filterData = (startDate, endDate, location) => {
    const result = data.filter((val) => {
      const valDate = new Date(val.date);
      if (!isNaN(valDate.getTime()) && val.town.length) {
        return valDate >= (new Date(startDate))
          && valDate <= (new Date(endDate))
          && location === val.town
      }
      return false;
    })
    return result;
  }


  useEffect(() => {
    if (startDate && endDate && location && location.length) {
      setWeatherData(filterData(startDate, endDate, location));
    }
  }, [startDate, endDate, location]);

  const onStartDateChange = (date) => {
    setStartDate(date);
  }

  const onEndDateChange = (date) => {
    setEndDate(date);
  }

  const onLocationChange = (event) => {
    setLocation(event.target.value);
  }

  return (
    <div className="App">
      <EditableSection
        startDate={startDate}
        endDate={endDate}
        location={null}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        onLocationChange={onLocationChange}
      />
      <div className="editable-section">
        {weatherData.map((item) => (
          <WeatherCard
            date={item.date}
            weather={item.weather}
            location={item.location}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
