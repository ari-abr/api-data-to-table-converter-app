import React from 'react';

const ImgResults = ({results}) => {
  //works
  const myResults = results;
  console.log(myResults);
  
  var myImg = ``;
  fetch('https://pixabay.com/api/?key=19641110-089431fe9f9b59580a5cbeae5&q=yellow+flowers&image_type=photo')
      .then((response) => {
       return response.json();
      })
      .then((result) => {
        myImg = result.hits.pageURL;
        console.log(myImg);

      })
      .catch((error) =>{
        console.log(error);
      });
  
    return (
      <div>
        <p>Space Weather Results: </p>
        <div className="img-results-section">
            <button>Images</button>
      <p>Img results here
      {myImg}</p>
          </div>
      </div>
    );
}

export default ImgResults;