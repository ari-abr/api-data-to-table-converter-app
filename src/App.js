import './App.css';
import React, { Component } from 'react';
import DisplayResults from './components/DisplayResults.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      option: '',
      results: []
    };
  }

  getResults(myOption){
    if(myOption!==null){
    var apiUrl = document.querySelector(`.input-link`).value;
    console.log("api url " + apiUrl)
    this.fetchResults(apiUrl, myOption)
  }
  else if(myOption === null){
    this.setState({option: myOption}, () => console.log(this.state.option));
  }
  }

  async fetchResults(url1, myOption){
    console.log(url1, myOption)
    await fetch(url1)
      .then((response) => {
        //console.log(response)
        return response.json();
        //return response.json();
      })
      .then((result) => {
        console.log("res " + result);
        var myResult = this.findResultsArray(result)
        this.setState({results: myResult},() => console.log(this.state.results));
      })
      .catch((error) => {
        console.log('Error: ' + error);
        this.setState({results: null},() => console.log(this.state.results));
      });

      this.setState({option: myOption}, () => console.log(this.state.option));
    }

    findResultsArray(myObject){
    var bigObject = myObject;
    console.log(bigObject)
    if(Array.isArray(bigObject) === true){
      //this.setState({results: bigObject}, () => console.log(this.state.results));
      return bigObject;
    }else{
      var biggestArray = [];
      var thisArray = [];
      for(var property in bigObject){
        console.log(property)
        if(Array.isArray(bigObject[property]) === true){
          thisArray = bigObject[property];
          console.log(thisArray)
          if(thisArray.length > biggestArray.length){
            biggestArray = bigObject[property];
          }
        }
      }
      return biggestArray
    }
  }

  toggle(myOption){
   if(this.state.isOn === true){
      this.setState({isOn: false},() => console.log("isOn: " + this.state.isOn));
      this.setState({option: null}, () => console.log(this.state.option));
  }
  else{
      //show component
      this.setState({isOn: true},() => console.log("isOn: " + this.state.isOn));
      this.getResults(myOption)
  }
  }
  

  copyLinkText(el){
    var textArea = document.getElementById(el);
    textArea.select();
    document.execCommand('copy');
  }

  render() {
    return (
      <div className="App">
        <div className="frame">
        <h1>JSON to Table</h1>
        <h4>Easy JSON</h4>
        <p>JSON (JavaScript Object Notation) is a popular data format that is commonly used in APIs. This tool makes processing data from API requests easier. It receives JSON data from an API request and displays it in a table, allowing searching and sorting the data as well as exporting the table into downloadable CSV and Excel format.</p>
        <p>Copy and paste an API request below:</p>
        <h4>Try these requests:</h4>
        <ol>
          <li><textarea cols="50" rows="2" readOnly value='https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY' id="link1"></textarea><button onClick={() => this.copyLinkText('link1')}>Copy</button></li>
          <li><textarea cols="50" rows="2" readOnly value='https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY' id="link2"></textarea><button onClick={() => this.copyLinkText('link2')}>Copy</button></li>
          <li><textarea cols="50" rows="2" readOnly value='https://api.le-systeme-solaire.net/rest/bodies/' id="link3"></textarea><button onClick={() => this.copyLinkText('link3')}>Copy</button></li>
        </ol>
        <form>
          <input type="text" className="input-link"></input>
        <button onClick={() => this.toggle('option')}>Search</button>
        </form>
        <div className="results">
        {this.state.option === 'option' && this.state.isOn === true && (<DisplayResults results={this.state.results}></DisplayResults>)}
        </div>
        </div>
        </div>
    );
  }
}
export default App;
