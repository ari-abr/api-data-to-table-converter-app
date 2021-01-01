import './App.css';
import React, { Component } from 'react';
//import SearchResults from './components/SearchResults.js';
import DailyImg from './components/DailyImg.js';
import SpaceWeather from './components/SpaceWeather.js';
import SolarSystemSearch from './components/SolarSystemSearch.js';
import Asteroids from './components/Asteroids.js';
import Exoplanets from './components/Exoplanets.js';

//import ImgResults from './components/SolarSystemSearch.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
        option: '',
        results: {},
        imgResults: {}
    };
  }
  
  getResults(myOption){
    if(myOption!==null){
    var apiUrl, apiUrl2;
    var query;
    
    if(myOption === 'Daily NASA Image'){
      apiUrl = `https://api.nasa.gov/planetary/apod?api_key=9lk2oaahnMAHNahXmIPbubEtXLHbspNRYVNKRag7`
    }
    if(myOption === 'Solar System'){
      query = document.querySelector('.ss-input-field').value;
      apiUrl = `https://api.le-systeme-solaire.net/rest/bodies/${query}`
      apiUrl2 = `https://pixabay.com/api/?key=19641110-089431fe9f9b59580a5cbeae5&q=${query}+planet&category=science&image_type=photo`
    }
    if(myOption === 'Space Weather'){
      query = document.querySelector('.sw-options').value
      apiUrl = `https://api.nasa.gov/DONKI/${query}?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=9lk2oaahnMAHNahXmIPbubEtXLHbspNRYVNKRag7`
    }
    if(myOption === 'Asteroids'){
      apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=9lk2oaahnMAHNahXmIPbubEtXLHbspNRYVNKRag7`
    }
    if(myOption === 'Exoplanets'){
      apiUrl = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=9lk2oaahnMAHNahXmIPbubEtXLHbspNRYVNKRag7`
    }
    this.fetchResults(apiUrl, apiUrl2, myOption)
    }
    else if(myOption === null){
      this.setState({option: myOption}, () => console.log(this.state.option));
    }
  }

  async fetchResults(url1, url2, myOption){
    var gotResults = false;
    await fetch(url1)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        //console.log(result);
        gotResults = true;
        this.setState({results: result},() => console.log(this.state.results));
      })
      .catch((error) => {
        console.log('Error: ' + error);
        this.setState({results: null},() => console.log(this.state.results));
      });
    
      if(url2 && gotResults === true){
        await fetch(url2)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        this.state.results.results2 = result;
        console.log(this.state.results)
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
      }
      this.setState({option: myOption}, () => console.log(this.state.option));
  }
    //
  toggle(myOption){
      if(this.state.isOn === true){
        this.setState({isOn: false},() => console.log("isOn: " + this.state.isOn));
        this.setState({option: null}, () => console.log(this.state.option));
        //hide component
    }
    else{
        this.setState({isOn: true},() => console.log("isOn: " + this.state.isOn));
        //show component
        this.getResults(myOption)
    }
    }


  render() {
    return (
      <div className="App">
        <div className="frame">
        <h1>Astro App</h1>
        <p className="info">APIs used: The Solar System Open Data - <a href="https://api.le-systeme-solaire.net/en/">https://api.le-systeme-solaire.net/en/</a></p>
        <p>Credit goes to the original developers.</p>
        <div className="menu-table">
          <h2>Daily NASA Image</h2>
          <h2>Search Space Weather</h2>
          <h2>Search Solar System Objects</h2>
          <h2>Search Asteroids</h2>
          <h2>Search Exoplanets</h2>
          <button onClick={() => this.toggle('Daily NASA Image')}>View</button>
          <div className="search-form">
          <form>
<select className="sw-options">
<option>Select space weather occurance</option>
  <option value="CME">Coronal Mass Ejection (CME)</option>
  <option value="CMEAnalysis">Coronal Mass Ejection Analysis (CME)</option>
  <option value="GST">Geomagnetic Storm (GST)</option>
  <option value="IPS">Interplanetary Shock (IPS)</option>

  <option value="FLR">Solar Flare (FLR)</option>
  <option value="SEP">Solar Energetic Particle (SEP)</option>
  <option value="MPC">Magnetopause Crossing (MPC)</option>
  <option value="RBE">Radiation Belt Enhancement (RBE)</option>
  <option value="HSS">Hight Speed Stream (HSS)</option>
  <option value="WSAEnlilSimulations">WSA+EnlilSimulation</option>
  <option value="notifications">Notifications</option>
</select>
        <button type="button" onClick={() => this.toggle('Space Weather')}>Search</button>
        </form>
        </div>
          <div className="search-form">
        <form>
          <input className="ss-input-field"></input>
          <button type="button"  onClick={() => this.toggle('Solar System')}>
            Search
          </button>
        </form>
        </div>
        <button onClick={() => this.toggle('Asteroids')}>View</button>
        <button onClick={() => this.toggle('Exoplanets')}>View</button>
        </div>
        <div className="results">
        {this.state.option === 'Daily NASA Image' && this.state.isOn === true && (<DailyImg results={this.state.results}></DailyImg>)}
        {this.state.option === 'Space Weather' && this.state.isOn === true && (<SpaceWeather results={this.state.results}></SpaceWeather>)}
        {this.state.option === 'Solar System' && this.state.isOn === true && (<SolarSystemSearch results={this.state.results}></SolarSystemSearch>)}
        {this.state.option === 'Asteroids' && this.state.isOn === true && (<Asteroids results={this.state.results}></Asteroids>)}
        {this.state.option === 'Exoplanets' && this.state.isOn === true && (<Exoplanets results={this.state.results}></Exoplanets>)}
        </div>
        </div>
      </div>
    );
  }
}
export default App;
