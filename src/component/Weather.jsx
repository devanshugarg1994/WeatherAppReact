import React from 'react'
import 'weather-icons/css/weather-icons.css';

   /*
    * Component Take care of showing the Data in Browser
   */
function Weather (props) {
    return (
        <div className = "container ">
            <div className="cards pt-5">
                <h1>
                    {props.city} {props.country}
                </h1>
                <div className="py-4">
                <i className= {`wi ${props.weatherIcon} display-1`}></i>
                <h1 className="py-2">{props.temp}</h1>
                {/* Show max and min Temp. */}
                {minmaxTemp(props.minTemp, props.maxTemp) }    
                <h1>{props.description}</h1>          
                 </div>
            </div>
        </div>
    );
}
    /*
    * Calculate the minMAxTemp
    */
function minmaxTemp (min, max) {
    return (
        <h3>
            <span className = "px-4">{min}</span>
            <span className = "px-4">{max}</span>
        </h3>
    )

}
 
export default Weather;