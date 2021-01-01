import React from 'react';

const SolarSystemSearch = ({ results }) => {
  var result = results;
  var resultsList = [];
  if (result) {

    //TEXT CONTENT
    var objType;
    if (result.isPlanet === false && result.aroundPlanet === null) {
      objType = 'star';
    } else if (result.isPlanet === true) {
      objType = 'planet';
    } else {
      objType = 'moon';
    }
    console.log(objType);

    resultsList = [
      { value: `Name: ${result.englishName}` },
      { value: `Type: ${objType}` },
      {
        value: `Mass: ${result.mass.massValue}*10^${result.mass.massExponent} kg`,
      },
      {
        value: `Volume: ${result.vol.volValue}*10^${result.vol.volExponent} km^3`,
      },
      { value: `Density: ${result.density} g/cm^3` },
      { value: `---` },
      { value: `Axial Tilt: ${result.axialTilt}°` },
      { value: `Inclination: ${result.inclination}°` },
      { value: `---` },
      {
        value: `Radius: ${result.vol.volValue}*10^${result.vol.volExponent} km^3`,
      },
      { value: `Eccentricity: ${result.eccentricity}` },
      { value: `Semimajor Axis: ${result.semimajorAxis} km` },
      { value: `Ellipticity/Flattening: ${result.flattening}` },
      { value: `---` },
      { value: `Sideral Orbit: ${result.sideralOrbit} days` },
      { value: `Sideral Rotation (period): ${result.sideralRotation} hours` },
      { value: `---` },
      { value: `Aphellion: ${result.aphelion} km` },
      { value: `Perihelion: ${result.perihelion} km` },
      { value: `---` },
      { value: `Escape Velocity: ${result.escape} m/s` },
      { value: `Gravity (surface): ${result.gravity} m/s^2` },
    ];

    var listItems = resultsList.map((item) => (
      <li key={Math.random()}>{item.value}</li>
    ));

    //IMAGE CONTENT
    var imageList= '';
      if(result.results2 && result.results2.hits){
        var imgUrl1, imgUrl2, imgUrl3;
        if(result.results2.hits[0]) imgUrl1 = result.results2.hits[0].previewURL;
        if(result.results2.hits[1]) imgUrl2 = result.results2.hits[1].previewURL;
        if(result.results2.hits[2]) imgUrl3 = result.results2.hits[2].previewURL; 
        
        imageList = <ul>
        {imgUrl1 && (<img key={Math.random()} src={imgUrl1} alt={String(result.englishName)}></img>)}
        {imgUrl2 && (<img key={Math.random()} src={imgUrl2} alt={String(result.englishName)}></img>)}
        {imgUrl3 && (<img key={Math.random()} src={imgUrl3} alt={String(result.englishName)}></img>)}
        </ul>
      }
  }

  return (
    <div>
      <p>Results: </p>
      <div className="results-section">
        <div className="col-1"><ul>{listItems}</ul></div>
        <div className="col-2">{imageList}</div>
      </div>
    </div>
  );
};

export default SolarSystemSearch;
/* resultsContent = 
            <ul>
            <li>Name: ${result.englishName}</li>
            <li>Type: ${objType}</li>
            <li>Mass: ${result.mass.massValue}*10<sup>${result.mass.massExponent}</sup> kg</li>
            <li>Volume: ${result.vol.volValue}*10<sup>${result.vol.volExponent}</sup> km<sup>3</sup></li>
            <li>Density: ${result.density} g/cm<sup>3</sup></li>
            <br>
            <li>Axial Tilt: ${result.axialTilt}&#176</li>
            <li>Inclination: ${result.inclination}&#176</li>
            <br>
            <li>Radius: ${result.equaRadius} km</li>
            <li>Eccentricity: ${result.eccentricity}</li>
            <li>Semimajor Axis: ${result.semimajorAxis} km</li>
            <li>Ellipticity/Flattening: ${result.flattening}</li>
            <br>
            <li>Sideral Orbit: ${result.sideralOrbit} days</li>
            <li>Sideral Rotation (period): ${result.sideralRotation} hours</li>
            <br>
            <li>Aphellion: ${result.aphelion} km</li>
            <li>Perihelion: ${result.perihelion} km</li>
            <br>
            <li>Escape Velocity: ${result.escape} m/s</li>
            <li>Gravity (surface): ${result.gravity} m/s<sup>2</sup></li>
            </ul>;
            <img src={imgUrl2} alt={String(result.englishName)}></img>
        <img src={imgUrl3} alt={String(result.englishName)}></img>*/
