import React from 'react'
import 'weather-icons/css/weather-icons.css';
function Weather () {
    return (
        <div className = "container">
            <h1>Weather App</h1> 
            <div className="cards">
                <h5 className="py-4">
                <i className="wi wi-day-sunny display-1"></i>
                <h1 className="py-2">25&deg;</h1>
                {/* Show max and min Temp. */}
                {minmaxTemp(20, 45)}
                </h5>
            </div>
        </div>
    );
}

function minmaxTemp (min, max) {
    return (
        <h3>
            <span className = "px-4">{min}&deg;</span>
            <span className = "px-4">{max}&deg;</span>
        </h3>
    )

}
 
export default Weather;