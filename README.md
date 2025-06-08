# Australia Weather Prediction App

A beautiful web application that predicts whether it will rain tomorrow in Australian cities using machine learning. Built with React, TypeScript, FastAPI, and a logistic regression model.

## Features

- 🌦️ **Rain Prediction**: Predict rain probability for tomorrow based on current weather conditions
- 🏙️ **Multiple Cities**: Support for 49+ Australian cities
- 📊 **Weather Statistics**: View historical weather statistics for each location
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 🤖 **Machine Learning**: Powered by logistic regression model
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile

## Tech Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Axios for API calls
- Vite for development

### Backend
- FastAPI (Python)
- Pandas for data processing
- Scikit-learn for machine learning
- Uvicorn ASGI server

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Your trained logistic regression model (.pkl file)

### Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Place your trained model file in `backend/model/weather_model.pkl`

4. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

   Or from the root directory:
   ```bash
   npm run backend
   ```

### Model Integration
The current implementation includes a demo prediction logic. To use your actual trained model:

1. Place your `.pkl` file in `backend/model/weather_model.pkl`
2. Update the prediction logic in `backend/main.py` to load and use your model:

```python
import pickle

# Load your trained model
with open("model/weather_model.pkl", "rb") as f:
    model = pickle.load(f)

# Use the model for predictions
prediction = model.predict(features)
probability = model.predict_proba(features)
```

## API Endpoints

- `GET /` - API health check
- `GET /locations` - Get all available Australian cities
- `GET /weather-stats/{location}` - Get weather statistics for a location
- `POST /predict` - Predict rain based on weather parameters

## Weather Parameters

The model uses the following input parameters:
- Location
- Temperature (min, max, 9am, 3pm)
- Rainfall
- Humidity (9am, 3pm)
- Pressure (9am, 3pm)
- Wind speed and gust speed
- Cloud cover (9am, 3pm)
- Evaporation and sunshine hours
- Rain today (Yes/No)

## Data Source

The application uses weather data from the Australian Bureau of Meteorology, including historical weather patterns from major Australian cities.

## Development

### Project Structure
```
├── src/
│   ├── components/     # React components
│   ├── services/       # API service layer
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── backend/
│   ├── data/           # Weather dataset
│   ├── model/          # ML model directory
│   ├── main.py         # FastAPI application
│   └── requirements.txt
└── README.md
```

### Available Scripts
- `npm run dev` - Start frontend development server
- `npm run build` - Build for production
- `npm run backend` - Start FastAPI backend server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the MIT License."# logirain_webapp" 
