import React, { useState, useEffect } from 'react';
import { BarChart3, MapPin, Droplets, Thermometer } from 'lucide-react';
import { WeatherStats as WeatherStatsType } from '../types/weather';
import { weatherAPI } from '../services/api';

interface WeatherStatsProps {
  location: string;
}

export const WeatherStats: React.FC<WeatherStatsProps> = ({ location }) => {
  const [stats, setStats] = useState<WeatherStatsType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!location) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await weatherAPI.getWeatherStats(location);
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch weather stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [location]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const StatCard = ({ 
    icon: Icon, 
    label, 
    value, 
    unit, 
    color = 'blue' 
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: number;
    unit: string;
    color?: string;
  }) => (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-5 h-5 text-${color}-600`} />
        <span className="text-sm font-medium text-gray-700">{label}</span>
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {value}{unit}
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="w-6 h-6 text-blue-600" />
        <h3 className="text-xl font-semibold text-gray-800">Weather Statistics</h3>
        <div className="flex items-center gap-2 ml-auto">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">{location}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <StatCard
          icon={Thermometer}
          label="Avg Min Temp"
          value={stats.avg_min_temp}
          unit="°C"
          color="blue"
        />
        <StatCard
          icon={Thermometer}
          label="Avg Max Temp"
          value={stats.avg_max_temp}
          unit="°C"
          color="red"
        />
        <StatCard
          icon={Droplets}
          label="Avg Rainfall"
          value={stats.avg_rainfall}
          unit="mm"
          color="blue"
        />
        <StatCard
          icon={Droplets}
          label="Humidity 9AM"
          value={stats.avg_humidity_9am}
          unit="%"
          color="cyan"
        />
        <StatCard
          icon={Droplets}
          label="Humidity 3PM"
          value={stats.avg_humidity_3pm}
          unit="%"
          color="cyan"
        />
        <StatCard
          icon={Droplets}
          label="Rain Days"
          value={stats.rain_days_percentage}
          unit="%"
          color="blue"
        />
      </div>
    </div>
  );
};