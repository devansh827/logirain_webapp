import React, { useState } from 'react';
import { Cloud, Droplets, Thermometer, Wind, Eye, Gauge } from 'lucide-react';
import { WeatherInput } from '../types/weather';

interface WeatherFormProps {
  onSubmit: (data: WeatherInput) => void;
  loading: boolean;
}

// Australian locations from the weather dataset
const LOCATIONS = [
  'Albury', 'BadgerysCreek', 'Cobar', 'CoffsHarbour', 'Moree',
  'Newcastle', 'NorahHead', 'NorfolkIsland', 'Penrith', 'Richmond',
  'Sydney', 'SydneyAirport', 'WaggaWagga', 'Williamtown',
  'Wollongong', 'Canberra', 'Tuggeranong', 'MountGinini', 'Ballarat',
  'Bendigo', 'Sale', 'MelbourneAirport', 'Melbourne', 'Mildura',
  'Nhil', 'Portland', 'Watsonia', 'Dartmoor', 'Brisbane', 'Cairns',
  'GoldCoast', 'Townsville', 'Adelaide', 'MountGambier', 'Nuriootpa',
  'Woomera', 'Albany', 'Witchcliffe', 'PearceRAAF', 'PerthAirport',
  'Perth', 'SalmonGums', 'Walpole', 'Hobart', 'Launceston',
  'AliceSprings', 'Darwin', 'Katherine', 'Uluru'
];

export const WeatherForm: React.FC<WeatherFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<WeatherInput>({
    location: LOCATIONS[0], // Default to first location
    min_temp: 10,
    max_temp: 25,
    rainfall: 0,
    evaporation: 5,
    sunshine: 8,
    wind_gust_speed: 30,
    wind_speed_9am: 15,
    wind_speed_3pm: 20,
    humidity_9am: 60,
    humidity_3pm: 40,
    pressure_9am: 1015,
    pressure_3pm: 1013,
    cloud_9am: 4,
    cloud_3pm: 3,
    temp_9am: 15,
    temp_3pm: 22,
    rain_today: 'No',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: keyof WeatherInput, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const InputField = ({ 
    label, 
    field, 
    type = 'number', 
    min, 
    max, 
    step = '0.1',
    icon: Icon,
    unit = ''
  }: {
    label: string;
    field: keyof WeatherInput;
    type?: string;
    min?: number;
    max?: number;
    step?: string;
    icon?: React.ComponentType<{ className?: string }>;
    unit?: string;
  }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {Icon && <Icon className="w-4 h-4 text-blue-600" />}
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={formData[field] || ''}
          onChange={(e) => handleInputChange(field, type === 'number' ? parseFloat(e.target.value) : e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
        {unit && (
          <span className="absolute right-3 top-2 text-sm text-gray-500">{unit}</span>
        )}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Location */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Eye className="w-4 h-4 text-blue-600" />
            Location
          </label>
          <select
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            {LOCATIONS.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Temperature */}
        <InputField
          label="Min Temperature"
          field="min_temp"
          min={-10}
          max={50}
          icon={Thermometer}
          unit="°C"
        />
        <InputField
          label="Max Temperature"
          field="max_temp"
          min={-10}
          max={50}
          icon={Thermometer}
          unit="°C"
        />
        <InputField
          label="9AM Temperature"
          field="temp_9am"
          min={-10}
          max={50}
          icon={Thermometer}
          unit="°C"
        />
        <InputField
          label="3PM Temperature"
          field="temp_3pm"
          min={-10}
          max={50}
          icon={Thermometer}
          unit="°C"
        />

        {/* Rainfall */}
        <InputField
          label="Rainfall"
          field="rainfall"
          min={0}
          max={200}
          icon={Droplets}
          unit="mm"
        />

        {/* Rain Today */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Droplets className="w-4 h-4 text-blue-600" />
            Rain Today
          </label>
          <select
            value={formData.rain_today}
            onChange={(e) => handleInputChange('rain_today', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Humidity */}
        <InputField
          label="Humidity 9AM"
          field="humidity_9am"
          min={0}
          max={100}
          icon={Droplets}
          unit="%"
        />
        <InputField
          label="Humidity 3PM"
          field="humidity_3pm"
          min={0}
          max={100}
          icon={Droplets}
          unit="%"
        />

        {/* Pressure */}
        <InputField
          label="Pressure 9AM"
          field="pressure_9am"
          min={980}
          max={1040}
          icon={Gauge}
          unit="hPa"
        />
        <InputField
          label="Pressure 3PM"
          field="pressure_3pm"
          min={980}
          max={1040}
          icon={Gauge}
          unit="hPa"
        />

        {/* Wind */}
        <InputField
          label="Wind Gust Speed"
          field="wind_gust_speed"
          min={0}
          max={150}
          icon={Wind}
          unit="km/h"
        />
        <InputField
          label="Wind Speed 9AM"
          field="wind_speed_9am"
          min={0}
          max={100}
          icon={Wind}
          unit="km/h"
        />
        <InputField
          label="Wind Speed 3PM"
          field="wind_speed_3pm"
          min={0}
          max={100}
          icon={Wind}
          unit="km/h"
        />

        {/* Cloud */}
        <InputField
          label="Cloud 9AM"
          field="cloud_9am"
          min={0}
          max={8}
          step="1"
          icon={Cloud}
          unit="oktas"
        />
        <InputField
          label="Cloud 3PM"
          field="cloud_3pm"
          min={0}
          max={8}
          step="1"
          icon={Cloud}
          unit="oktas"
        />

        {/* Other */}
        <InputField
          label="Evaporation"
          field="evaporation"
          min={0}
          max={50}
          icon={Droplets}
          unit="mm"
        />
        <InputField
          label="Sunshine"
          field="sunshine"
          min={0}
          max={14}
          icon={Cloud}
          unit="hours"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Predicting...' : 'Predict Rain Tomorrow'}
      </button>
    </form>
  );
};