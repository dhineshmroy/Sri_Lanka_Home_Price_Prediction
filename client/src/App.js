import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css"

function App() {
  const [area, setArea] = useState(1000);
  const [bathrooms, setBathrooms] = useState(2);
  const [bhk, setBHK] = useState(2);
  const [landSize, setLandSize] = useState(10); // Initial value for land size
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState();

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/get_location');
      setLocations(response.data.location);
    }catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const onClickedEstimatePrice = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/predict_home_price', {
        Baths: bathrooms,
        Land_size: landSize,
        Beds: bhk,
        House_size: area,
        location: selectedLocation
      });
      
      setEstimatedPrice(response.data.estimated_price);
      console.log(response.data.estimated_price)
    } catch (error) {
        console.error('Error estimating price:', error.message);
        console.error('Response status code:', error.response.status);
        console.error('Response data:', error.response.data);
      }   
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="container">
      <div className="img"></div>
      <div className="form">
        <h1>Sri Lanka Home Price Prediction</h1>
        <div className="input-group">
          <label htmlFor="uiBathrooms">Bathrooms</label>
          <div className="switch-field" id="uiBathrooms">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
              <React.Fragment key={value}>
                <input
                  type="radio"
                  id={`radio-bath-${value}`}
                  name="uiBathrooms"
                  value={value}
                  checked={bathrooms === value}
                  onChange={() => setBathrooms(value)}
                />
                <label htmlFor={`radio-bath-${value}`}>{value}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="uiSqft">House Size (Square Feet)</label>
          <input
            className="area"
            type="text"
            id="uiSqft"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="uiBHK">Bedrooms</label>
          <div className="switch-field" id="uiBHK">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
              <React.Fragment key={value}>
                <input
                  type="radio"
                  id={`radio-bhk-${value}`}
                  name="uiBHK"
                  value={value}
                  checked={bhk === value}
                  onChange={() => setBHK(value)}
                />
                <label htmlFor={`radio-bhk-${value}`}>{value}</label>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label htmlFor="uiLandSize">Land Size (Perches)</label>
          <input
            className="land-size"
            type="text"
            id="uiLandSize"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="uiLocations">Location</label>
          <select
            className="location"
            id="uiLocations"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="" disabled>Choose a Location</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <button className="submit" onClick={onClickedEstimatePrice}>Estimate Price</button>
        <div id="uiEstimatedPrice" className="result">
          <h2>Rs. {estimatedPrice}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
