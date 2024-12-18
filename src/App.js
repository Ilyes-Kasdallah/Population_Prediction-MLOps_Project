import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

// Registering ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [year, setYear] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictions([]);
    setError(null);

    try {
      // Fetch predictions for the current year and the previous 5 years
      const years = [parseInt(year)];
      for (let i = 1; i <= 5; i++) {
        years.push(parseInt(year) - i);
      }

      const predictionPromises = years.map((y) =>
        axios.post(
          'https://q11emqv9h9.execute-api.us-east-1.amazonaws.com/production/forecast',
          { year: y }
        )
      );

      const responses = await Promise.all(predictionPromises);
      const newPredictions = responses.map((response) => JSON.parse(response.data.body));

      // Set the predictions in the correct order (input year first)
      setPredictions(newPredictions);
    } catch (err) {
      setError(err.response?.data?.body ? JSON.parse(err.response.data.body).message : 'Error fetching prediction');
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    if (predictions.length === 0) return {};

    // Reverse predictions for chart data (to show increasing population)
    const reversedPredictions = [...predictions].reverse();
    
    const labels = reversedPredictions.map((prediction) => prediction.year);
    const data = reversedPredictions.map((prediction) => prediction.yhat);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Global Population Forecast',
          data: data,
          borderColor: '#3498db',
          backgroundColor: 'rgba(52, 152, 219, 0.2)',
          borderWidth: 2,
          tension: 0.4,
        },
      ],
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Population Prediction</h1>
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

        {predictions.length > 0 && (
          <div className="result">
            {/* Display prediction for the input year */}
            <h2>Prediction for Year {predictions[0].year}</h2>
            <p><strong>Global Population for Year {predictions[0].year}:</strong> {predictions[0].yhat}</p>

            {/* Render the chart for the previous 5 years + input year */}
            <div className="chart-container">
              <Line data={getChartData()} />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
