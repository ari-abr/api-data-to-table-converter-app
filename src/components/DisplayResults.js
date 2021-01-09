import React, { Component } from 'react';
import Collapsible from 'react-collapsible';

class  DisplayResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.results
    };
  }

  makeHeadings() {
    var result = this.state.results;
    if (result) {
      console.log(result)
      var headingsList = [];
      var listHeadings = [];
      for (var property in result[0]) {
        headingsList.push(property);
      }
      headingsList.unshift(`#`);
      listHeadings = headingsList.map((item) => (
        <th className="results-tr" key={Math.random()}>
          <div className="sorting-buttons">
          <p>{item}</p>
          <div className="sorting-buttons-column">
            <button onClick={() => this.sortBodies(item, 'increase')}>
              <i className="fas fa-chevron-up"></i>
            </button>
            <button onClick={() => this.sortBodies(item, 'decrease')}>
              <i className="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
        </th>
      ));
      return <tr>{listHeadings}</tr>;
    }else{
      return <tr key={Math.random()}><td key={Math.random()}>Results not found</td></tr>
    }
  }

  makeResults() {
    var result = this.state.results;
    var listResults = [];
    if (result) {
      for (var i = 0; i < result.length; i++) {
        var resultsList = [];
        resultsList.push(<td key={Math.random()}>{i + 1}</td>);
        for (var property1 in result[i]) {
          var myResult;
          if (Array.isArray(result[i][property1])) {
            var myResult1 = [];
            for (var property2 in result[i][property1]) {
              var el = JSON.stringify(result[i][property1][property2]);
              myResult1.push(el);
            }
            myResult = myResult1
              .join(`\n`)
              .replaceAll('{', '')
              .replaceAll('}', '')
              .replaceAll('"', ' ')
              .replaceAll(',', '\n')
              .replaceAll('_', ' ');
          } else if (
            Array.isArray(result[i][property1]) === false &&
            result[i][property1] !== null &&
            result[i][property1] !== ''
          ) {
            var myResult3 = String(JSON.stringify(result[i][property1]));
            myResult = myResult3
              .replaceAll('"', ' ')
              .replaceAll('{', '')
              .replaceAll('}', '');
          } else if (
            result[i][property1] === null ||
            result[i][property1] === 'undefined' ||
            result[i][property1] === ''
          ) {
            myResult = '---';
          }
          var end = myResult.length;
          var myResult2;
          if (end > 40) {
            var triggerWord = myResult.substr(0, 15) + '...';
            myResult2 = (
              <Collapsible className="collapsible" trigger={triggerWord}>
                ${myResult}
              </Collapsible>
            );
          } else {
            myResult2 = myResult;
          }

          resultsList.push(<td key={Math.random()}>{myResult2}</td>);
        }
        listResults.push(<tr key={Math.random()}>{resultsList}</tr>);
      }
      return <tbody className="results-tbody">{listResults}</tbody>;
    }else{
        return <tbody><tr key={Math.random()}><td key={Math.random()}>Results not found</td></tr></tbody>
    }
  }

  sortBodies(myItem, mySortingOption) {
    var option = myItem;
    var sortingOption = mySortingOption; //increase or decrease
    var bodies1 = this.state.results;
    var bodies2 = bodies1;
    var item1;
    var item2;
    //var smallIndex;
    //var bigItemIndex = 0;
    for (var i = 0; i < bodies1.length; i++) {
      var smallIndex = i;
      for (var j = i + 1; j < bodies1.length; j++) {
        if(bodies2[smallIndex][option] == null || bodies2[j][option] == null){
          item1 = '0';
          item2 = '0';
          //break
        }
        else if (typeof bodies2[smallIndex][option] === 'string' && bodies2[smallIndex][option].length < 10) {
          item1 = bodies2[smallIndex][option].charAt(0);
          item2 = bodies2[j][option].charAt(0);
        }else if (Object.keys(bodies2[smallIndex][option]).length > 0 && Object.keys(bodies2[j][option]).length > 0) {
          var keys1 = [];
          var keys2 = [];
          for(var prop1 in bodies2[smallIndex][option]){
            keys1.push(bodies2[smallIndex][option][prop1])
          }
          for(var prop2 in bodies2[j][option]){
            keys2.push(bodies2[j][option][prop2])
          }
          item1 = keys1.join();
          item2 = keys2.join();
        } else {
          item1 = bodies2[smallIndex][option];
          item2 = bodies2[j][option];
        }

        if (sortingOption === 'increase') {
          if (item2 < item1) {
            smallIndex = j;
          }
        }
        if (sortingOption === 'decrease') {
          if (item2 > item1) {
            smallIndex = j;
          }
        }
      }
      var temp = bodies2[i];
      bodies2[i] = bodies2[smallIndex];
      bodies2[smallIndex] = temp;
    }
    this.setState({results: bodies2}, () => console.log(this.state.results));
  }
  

  render() {
    return (
      <div>
        <p>Results</p>
        <button className="button-csv">Download Table as CSV</button>
        <table className="table">
        <thead className="table-heading">{this.makeHeadings()}</thead>
        {this.makeResults()}
        </table>
      </div>
    );
  }
}
export default DisplayResults;

/*Get results:
1) Find an array of objects in that big object
2) Parse through the array
*/
/*<thead class="heading">{this.makeHeadings()}</thead>
          {this.makeResults()}*/