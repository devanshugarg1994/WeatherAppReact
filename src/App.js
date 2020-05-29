import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css'
import Weather from './component/Weather';
import Form from './component/Form.component'
const Api_Key = `dc343795411eab45f9705a26e074052e`

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      state: undefined,
      country: undefined,
      minTemp: undefined,
      maxTemp: undefined,
      temp: undefined,
      description: undefined,
      error: false
    };
    /*
    * Icon supported in the APP
    */
   this.weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

}


   /*
    * Wheather Icon Cases and Set the vlue acc. to response
    */
  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }
    /*
    * Change temp recived fom response to Celcuis and returning upto 2 decimal place
    */
  calCelcius (temp) {
   let tempCelcius = (temp - 273.15);
    return tempCelcius.toFixed(2);
  }

    /*
    * Async function calling the API and etting the state
    */
  getWeather =  (e) => {
    e.preventDefault();
    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;
    if ((country && city) && (country !== "" && city !== "")){
      this.api_Call(country, city);
    }else {
      this.setState({
      error: true        
      });
  }
}

  api_Call = async (country, city) => {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
      const response = await api_call.json();
  
      this.setState({
        state: `${response.name},`,
        country: response.sys.country,
        minTemp: `${this.calCelcius(response.main.temp_min)}&deg;`,
        maxTemp: `${this.calCelcius(response.main.temp_max)}&deg;`,
        temp: `${this.calCelcius(response.main.temp)}&deg;`,
        description: response.weather[0].description,
        error: false
      })
      this.get_WeatherIcon( this.weatherIcon, response.weather[0].id);
  }

  render () {
    return (
      <div className="App" >
       <Form getWeather = {this.getWeather} error = {this.state.error}/> {/*handler on form submit and calling Api Asyncronus*/}
       <Weather city = {this.state.state} 
                country = {this.state.country}
                minTemp = {this.state.minTemp}
                maxTemp = {this.state.maxTemp}
                temp = {this.state.temp}
                description = {this.state.description}
                weatherIcon = {this.state.icon}
                 />
      </div>
    );
  }
}
export default App;
