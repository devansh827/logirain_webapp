import React from 'react';
import { CloudRain, Sun, TrendingUp, AlertCircle } from 'lucide-react';
import { PredictionResponse } from '../types/weather';

interface PredictionResultProps {
  result: PredictionResponse;
}

export const PredictionResult: React.FC<PredictionResultProps> = ({ result }) => {
  const isRain = result.prediction === 'Yes';
  const probabilityPercentage = Math.round(result.probability * 100);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center space-y-6">
        {/* Main Prediction */}
        <div className="space-y-4">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
            isRain ? 'bg-blue-100' : 'bg-yellow-100'
          }`}>
            {isRain ? (
              <CloudRain className="w-10 h-10 text-blue-600" />
            ) : (
              <Sun className="w-10 h-10 text-yellow-600" />
            )}
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isRain ? 'Rain Expected' : 'No Rain Expected'}
            </h2>
            <p className="text-lg text-gray-600">
              Tomorrow in Australia
            </p>
          </div>
        </div>

        {/* Probability */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-700">Probability</span>
          </div>
          
          <div className="space-y-3">
            <div className="text-4xl font-bold text-blue-600">
              {probabilityPercentage}%
            </div>
            
            {/* Probability Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  isRain ? 'bg-blue-600' : 'bg-yellow-500'
                }`}
                style={{ width: `${probabilityPercentage}%` }}
              />
            </div>
            
            <div className="text-sm text-gray-500">
              Chance of rain tomorrow
            </div>
          </div>
        </div>

        {/* Confidence Level */}
        <div className="flex items-center justify-center gap-3">
          <AlertCircle className="w-5 h-5 text-gray-500" />
          <span className="text-gray-600">Confidence Level:</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getConfidenceColor(result.confidence)}`}>
            {result.confidence}
          </span>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-4">
          <p>
            This prediction is based on current weather conditions and historical patterns.
            Weather can be unpredictable, so please check local forecasts for the most accurate information.
          </p>
        </div>
      </div>
    </div>
  );
};