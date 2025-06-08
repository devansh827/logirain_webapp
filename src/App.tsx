import React, { useState } from 'react';
import { Cloud, Github, Info } from 'lucide-react';
import { WeatherForm } from './components/WeatherForm';
import { PredictionResult } from './components/PredictionResult';
import { WeatherStats } from './components/WeatherStats';
import { WeatherInput, PredictionResponse } from './types/weather';
import { weatherAPI } from './services/api';

function App() {
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const handlePrediction = async (weatherData: WeatherInput) => {
    setLoading(true);
    setError(null);
    setSelectedLocation(weatherData.location);
    
    try {
      const result = await weatherAPI.predictRain(weatherData);
      setPrediction(result);
    } catch (err) {
      setError('Failed to get prediction. Please make sure the backend server is running.');
      console.error('Prediction error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Cloud className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Australia Weather Predictor
                </h1>
                <p className="text-sm text-gray-600">
                  AI-powered rain prediction using machine learning
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" />
                <span>Logistic Regression Model</span>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Will it rain tomorrow?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Enter current weather conditions to predict if it will rain tomorrow in any Australian city.
              Our machine learning model analyzes multiple weather parameters to provide accurate predictions.
            </p>
          </div>

          {/* Weather Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <Cloud className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-800">Weather Parameters</h3>
            </div>
            <WeatherForm onSubmit={handlePrediction} loading={loading} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {(prediction || selectedLocation) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Prediction Result */}
              {prediction && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Prediction Result</h3>
                  <PredictionResult result={prediction} />
                </div>
              )}

              {/* Weather Statistics */}
              {selectedLocation && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Location Statistics</h3>
                  <WeatherStats location={selectedLocation} />
                </div>
              )}
            </div>
          )}

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">How to use:</h3>
            <ol className="list-decimal list-inside space-y-2 text-blue-800">
              <li>Select an Australian city from the dropdown</li>
              <li>Enter the current weather parameters (temperature, humidity, rainfall, etc.)</li>
              <li>Click "Predict Rain Tomorrow" to get your prediction</li>
              <li>View the prediction result with confidence level and probability</li>
            </ol>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Make sure the FastAPI backend server is running on port 8000 for predictions to work.
                Run <code className="bg-blue-200 px-1 rounded">npm run backend</code> to start the server.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Built with React, TypeScript, FastAPI, and Machine Learning</p>
            <p className="text-sm mt-2">Weather data from Australian Bureau of Meteorology</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;