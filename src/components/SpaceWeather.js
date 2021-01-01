import React from 'react';

const SpaceWeather = ({results}) => {
  var result = results;
  var headingsList = [];
  var listHeadings = [];
  var listResults = [];
  console.log(result);
  if(result){
    for(var property in result[0]){
      headingsList.push(property)
    }
    listHeadings = headingsList.map((item) => (
      <th key={Math.random()}>{item}</th>
    ));
    //console.log(headingsList)

    for(var i = 0; i < result.length; i++){
      //object: console.log(results[i])
      var resultsList = [];
      for(var property1 in result[i]){
        var myResult;
        if(result[i][property1]){
          myResult = String(result[i][property1])
        }else{
          myResult = '---'
        }
        if(Array.isArray(result[i][property1])){
          console.log('issa array!')
          myResult = result[i][property1].join()
        }
        resultsList.push(<td key={Math.random()}>{myResult}</td>)
      }
      listResults.push(
        <tr key={Math.random()}>{resultsList}</tr>
      )
    }

    //console.log(listResults)
  }
  
    return (
      <div>
      <p>results here</p>
       <table>
         <thead>
           <tr>
           {listHeadings}
           </tr>
         </thead>
         <tbody>
           {listResults}
         </tbody>
       </table>
      </div>
    );
}

export default SpaceWeather;
/*
//var query = document.querySelector('.img-lib-input-field').value;
    var applicationId = 'dd297681-c8fc-4994-a38d-7136346760d8';
    var applicationSecret =
      '36c45522ed9ddc0716fe656fee5bff5488f44011b47a7ca558457ebbfe7ea800805a9f7f4e10dd9d01ce807ab5e09aa4faff2691d3b8d6365a474479f0c32df18fc7640f6f73edb9f167d264b76c9364ffd7d0c9267287c1477c20b719358ae724ab28045c1d2c67ed5222a7c8d5e73e';

    const hash = btoa(`${applicationId}:${applicationSecret}`);

    const url = 'https://api.astronomyapi.com/api/v2/bodies';

    fetch(url, {
        headers: {
            Authorization: `Basic <${hash}>`,
          }
    })
      .then((response) => {
        console.log('there is some response wow');
        return response;
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log('Error: ' + error);
      });
      */
     /*<form>
          <input className="img-lib-input-field"></input>
          <button className="img-lib-search-button" onClick={this.showImageLib}>
            Search
          </button>
        </form>
        <div className="img-lib-section"></div>*/
/*
const myResults = results;
  console.log(myResults);
  console.log("img lib");
  console.log(myResults[0].eventTime);
  
  
    return (
      <div>
        <p>Results: </p>
        <div className="img-lib-section">
      <p>{`${myResults[0].eventTime}`}</p>
          </div>
      </div>
    );
 */

 /*<div>
        <label for="start">From:</label>
<input type="date"
       min="2015-01-01" max="2022-01-01"></input>
       <label for="start">To:</label>
       <input type="date"
       min="2012-01-01" max="2022-01-01"></input>
       </div> */

       /*for(var i = 0; i < result.length; i++){
      //console.log(result[i]) //works
      //headingsList is undefined
      for(var j = 0; j < headingsList.length; j++){
        for(var property1 in result[0]) {
          if(result[i][property1]){
            //this below works
          //console.log(`${i}  ${result[i][property1]}`)
          /*resultsList.push(<td key={Math.random()}>{String(result[i][property1])}</td>)
          resultsList.push(String(result[i][property1]))
          }
          else{
            resultsList.push(`---`)
            /*resultsList.push(<td key={Math.random()}>---</td>)
          }
          //resultsList[i].push({value: `${result[0][property1]}`})
        }
      }
    } 
    
    
    //iterating trough each object in the array
    /*for(var i = 0; i < result.length; i++){

      for(var j = 0; j < headingsList.length; j++){
        for(var property1 in result[0]) {
          if(result[i][property1]){
          resultsList.push(<td key={Math.random()}>{result[i][property1]}</td>)
          //resultsList.push(String(result[i][property1]))
          }
          else{
            //resultsList.push(`---`)
            resultsList.push(<td key={Math.random()}>---</td>)
          }
          //resultsList[i].push({value: `${result[0][property1]}`})
        }
      }
    }
    console.log(resultsList)
    //console.log(headingsList.length)

    //do edits here: array for each number of items of headings
    for(var k = 0; k < resultsList.length; k++){
      var c = k + 1;
      var littleArray = resultsList.slice(c, k+=headingsList.length);
      //console.log("la " + littleArray)
    }

  /*listResults = resultsList.map((item) => (
      <tr key={Math.random()}>{item}</tr>
    ));*/