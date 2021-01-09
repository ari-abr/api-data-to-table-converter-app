import React, { Component } from 'react';
//import ImgResults from './components/SolarSystemSearch.js';



class Testing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };
  }

  sayHI(){
      console.log(this.props)
  }
  


  render() {
    return (
      <div>
          <button onClick={() => this.sayHI()}>Hi</button>
      </div>
    );
  }
}
export default Testing;
