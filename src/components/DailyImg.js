import React from 'react';

const DailyImg = ({results}) => {
  //works
  const result = results;
  //console.log(myResults);
  
  /*var imageContent = `<p>${result.title}</p>
  <p>${result.explanation}</p>
  <p>${result.date}</p>
  <img src=${result.url} alt="Daily NASA Image"></img>`*/
  
    return (
      <div>
        <p>{result.title}</p>
  <p>{result.explanation}</p>
  <p>{result.date}</p>
  <img src={result.url} alt="Daily NASA"></img>
      </div>
    );
}

export default DailyImg;
/*import React from 'react';

class DailyImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isOn: false
    };
  }

toggleButton(){
    if(this.state.isOn === true){
        this.setState({isOn: false},() => console.log(this.state.isOn));
        this.hideImage();
    }
    else{
        this.setState({isOn: true},() => console.log((this.state.isOn)));
        this.showImage();
    }
}
  showImage() {
    var imageSection = document.querySelector('.img-section');
    imageSection.innerHTML = ``;
    fetch('https://api.nasa.gov/planetary/apod?api_key=9lk2oaahnMAHNahXmIPbubEtXLHbspNRYVNKRag7')
      .then((response) => {
       return response.json();
      })
      .then((result) => {
        //console.log(result);
        var imageContent = `<p>${result.title}</p>
        <p>${result.explanation}</p>
        <p>${result.date}</p>
        <img src=${result.url} alt="Daily NASA Image"></img>`;
        imageSection.insertAdjacentHTML('beforeend', imageContent);
      })
      .catch((error) =>{
        console.log(error);
        var errorMsg = `<p>Error displaying image, try again later.</p>`;
        imageSection.insertAdjacentHTML('beforeend', errorMsg);
      });
  }

  hideImage(){
    var imageSection = document.querySelector('.img-section');
    imageSection.innerHTML = ``;
  }
  render() {
    return (
      <div>
        <button className="img-button" onClick={ () => this.toggleButton()}>
            X
          </button>
          <div className="img-section">

          </div>
      </div>
    );
  }
}

export default DailyImg; */