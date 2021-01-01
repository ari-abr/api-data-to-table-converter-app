import React from 'react';
import Collapsible from 'react-collapsible';


const Asteroids = ({results}) => {
  //works
  const result = results.near_earth_objects;
  var headingsList = [];
  var listHeadings = [];
  var listResults = [];
  if(result){
  console.log(result)
  for(var property in result[0]){
    headingsList.push(property)
  }
  headingsList.unshift('#')
  listHeadings = headingsList.map((item) => (
    <th key={Math.random()}>{item}</th>
  ));
  //console.log(headingsList)
  for(var i = 0; i < result.length; i++){
    var resultsList = [];
    resultsList.push(<td key={Math.random()}>{i+1}</td>)
    for(var property1 in result[i]){
      var myResult;
      if(Array.isArray(result[i][property1])){
        var myResult1 = [];
        //convert the thing to javascript object
        //convert object into string
        for(var property2 in result[i][property1]){
          var el = JSON.stringify(result[i][property1][property2])
          myResult1.push(el)
        }
        myResult = myResult1.join(`\n`).replaceAll('{','').replaceAll('}','').replaceAll('"', ' ').replaceAll(',', '\n').replaceAll('_', ' ')
        //console.log(myResult)
      }
      else if(Array.isArray(result[i][property1])===false){
        var myResult3 = String(JSON.stringify(result[i][property1]))
        myResult = myResult3.replaceAll('"',' ').replaceAll('{','').replaceAll('}','')
        //console.log(result[i][property1])     
      }else{
        myResult = '---'
      }
      var end = myResult.length;
      //var triggerWord;
      var myResult2;
      if(end > 100){
        var triggerWord = myResult.substr(0,15)+"..."
        //console.log(triggerWord)
         myResult2 = <Collapsible className="collapsible" trigger={triggerWord}>{myResult}</Collapsible>
        }
      else{ 
        myResult2 = myResult;
      }
      resultsList.push(<td key={Math.random()}>{myResult2}</td>)
    }

    listResults.push(
      <tr key={Math.random()}>{resultsList}</tr>
    )
  }

 // console.log(listResults)
  
  }
    return (
      <div>
        <p>Results</p>
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

export default Asteroids;