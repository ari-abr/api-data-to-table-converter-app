import './App.css';
import React, { Component } from 'react';
import DisplayResults from './components/DisplayResults.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null,
    };
  }

  /**1) Gets url from a user input
   * 2) Makes a fetch call with that link to get JSON response
   * 3) Calls another function to find results in that response
   * 4) Stores that value inside "this.state.results" */
  async getResults() {
    this.setState({ results: null }, () =>
      console.log('null results :( ' + this.state.results)
    );
    var apiUrl = document.querySelector(`.input-link`).value;
    await fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        var myResult = this.findResultsArray(result);
        this.setState({ results: myResult }, () =>
          console.log(this.state.results)
        );
      })
      .catch((error) => {
        console.log('Error: ' + error);
        alert(
          'No results found. Check the URL and make sure that response is in JSON format or try again later.'
        );
        this.setState({ results: null }, () =>
          console.log('null results :( ' + this.state.results)
        );
      });
  }

  /**1) Inputs the JSON response returned from the "fetch" call
   * 2) Finds the results array
   * 3) Returns it back to the "getResults" function */
  findResultsArray(myObject) {
    var bigObject = myObject;
    //Two scenarios for a JSON response returned:
    //Scenario 1: response returned is already an array so we will use it
    if (Array.isArray(bigObject) === true) {
      return bigObject;
    }
    //Scenario 2: response returned is an object containing keys and values
    else if (typeof bigObject === 'object') {
      /* Now the response can either contain A) the results as keys and values of the object itself, or B) the results stored in an array of one of the values. 
      Assuming the result items are the the longest we can find the results the following way: 
    1) Count the number of properties the object has.
    2) Count the number of the longest array items the object has.
    3) Properties > array items, then the results are properties. If otherwise, the results is the longest array. */
      var propCount = 0;
      for (var property in bigObject) {
        propCount++;
      }
      var biggestArrayLength = 0;
      var biggestArray1 = [];
      for (var property1 in bigObject) {
        var thisArray1 = [];
        if (Array.isArray(bigObject[property1]) === true) {
          thisArray1 = bigObject[property1];
          if (thisArray1.length > biggestArray1.length) {
            biggestArray1 = thisArray1;
          }
        }
      }
      biggestArrayLength = biggestArray1.length;
      if (propCount > biggestArrayLength) {
        var myArray1 = [];
        myArray1[0] = bigObject;
        return myArray1;
      } else {
        var thisArray = [];
        var biggestArray = [];
        //if the thing is an object with keys convert it to array
        for (var property2 in bigObject) {
          if (Array.isArray(bigObject[property2]) === true) {
            thisArray = bigObject[property2];
            if (thisArray.length > biggestArray.length) {
              biggestArray = thisArray;
            }
          }
        }
        return biggestArray;
      }
    }
  }

  /*When a button is pressed next to one of the links, the text is copied to clipboard so then the user can paste it in the text input*/
  copyLinkText(el) {
    var textArea = document.getElementById(el);
    textArea.select();
    document.execCommand('copy');
  }

  render() {
    return (
      <div className="App">
        <div className="frame">
          <div className="description">
            <h1>API Data to Table Converter</h1>
            <h4>Convert Data from an API Request to Table or Text</h4>
            <p>
              JSON (JavaScript Object Notation) is a popular data format that is
              easy to transfer and process. It is commonly used for transporting
              data from APIs (Application Programming Interface).
            </p>
            <p>
              Sometimes parsing the received JSON data can get complicated. This
              tool makes processing data from API requests easier. It first
              makes an API call. If the request is successful, the data gets
              parsed and displayed as a table. Users can then search and sort
              the data table as well as download the table in plain text or CSV
              format.
            </p>
            <p>
              For a successful API call please ensure that the API is either
              public or it includes an API key if necessary, and that it returns
              data in JSON format with properties and values. Please wait a few
              seconds for the results to load.
            </p>
            <p>Copy and paste an API request below:</p>
            <h4>Try these requests:</h4>
            <ol>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY"
                  id="link1"
                ></textarea>
                <button onClick={() => this.copyLinkText('link1')}>Copy</button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://api.nasa.gov/DONKI/CME?startDate=yyyy-MM-dd&endDate=yyyy-MM-dd&api_key=DEMO_KEY"
                  id="link2"
                ></textarea>
                <button onClick={() => this.copyLinkText('link2')}>Copy</button>
              </li>
              <li>
                <textarea
                  cols="50"
                  rows="2"
                  readOnly
                  value="https://api.le-systeme-solaire.net/rest/bodies/"
                  id="link3"
                ></textarea>
                <button onClick={() => this.copyLinkText('link3')}>Copy</button>
              </li>
            </ol>
            <div className="search-form">
              <form>
                <input type="text" className="input-link"></input>
              </form>
              <button onClick={() => this.getResults()}>
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="results">
            {this.state.results !== null && (
              <DisplayResults
                results={this.state.results}
                originalResults={this.state.results}
              ></DisplayResults>
            )}
          </div>
          <footer>
            <hr></hr>
            <p>
              <i className="fab fa-github"></i> GitHub:{' '}
              <a href="https://github.com/ari-abr/api-data-to-table-converter-app">
                https://github.com/ari-abr/api-data-to-table-converter-app
              </a>
            </p>
            <p>
              Made with{' '}
              <a href="https://reactjs.org/">
                React.js<i className="fab fa-react"></i>
              </a>
            </p>
            <p>By A. A.</p>
          </footer>
        </div>
      </div>
    );
  }
}
export default App;
/*Main Algorithm:
1) Get the results object/array
2) Find the array or convert it to an array
3) Pass it to the DisplayResults.js
*/
