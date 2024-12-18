import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [year, setYear] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPrediction(null);
    setError(null);

    try {
      const response = await axios.post(
        'https://q11emqv9h9.execute-api.us-east-1.amazonaws.com/production/forecast',
        { year } // Send year as JSON in the request body
      );
      setPrediction(JSON.parse(response.data.body));
    } catch (err) {
      setError(err.response?.data?.body ? JSON.parse(err.response.data.body).message : 'Error fetching prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Forecast Prediction</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="number"
            placeholder="Enter Year (e.g., 2045)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="button">
            Get Prediction
          </button>
        </form>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {prediction && (
          <div className="result">
            <h2>Prediction for Year {prediction.year}</h2>
            <p><strong>Forecast (yhat):</strong> {prediction.yhat}</p>
            <p><strong>Lower Bound (yhat_lower):</strong> {prediction.yhat_lower}</p>
            <p><strong>Upper Bound (yhat_upper):</strong> {prediction.yhat_upper}</p>
            {prediction.actual !== null && <p><strong>Actual:</strong> {prediction.actual}</p>}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
