# Netlify Development Setup

This project uses Netlify Functions to securely proxy API requests.

## Local Development

### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

### 2. Set up environment variables
Create a `.env` file in the root directory:
```bash
WEATHER_API_KEY=your_openweathermap_api_key_here
FOOTBALL_API_KEY=your_api_football_key_here
```

### 3. Start local development server
```bash
netlify dev
```

This will:
- Start your site on `http://localhost:8888`
- Run Netlify Functions locally
- Load environment variables from `.env`

## Production Deployment

### 1. Deploy to Netlify
- Connect your GitHub repository to Netlify
- Netlify will automatically deploy when you push to main

### 2. Set environment variables in Netlify
In your Netlify dashboard:
- Go to Site Settings → Environment Variables
- Add:
  - `WEATHER_API_KEY`: Your OpenWeatherMap API key
  - `FOOTBALL_API_KEY`: Your API-Football key

### 3. API Endpoints
Your functions will be available at:
- Weather: `https://your-site.netlify.app/.netlify/functions/weather`
- Football: `https://your-site.netlify.app/.netlify/functions/football`

Or using the cleaner redirects:
- Weather: `https://your-site.netlify.app/api/weather`
- Football: `https://your-site.netlify.app/api/football`

## Getting API Keys

### OpenWeatherMap (Free)
1. Go to https://openweathermap.org/api
2. Sign up for free account
3. Get your API key from the dashboard

### API-Football (Free)
1. Go to https://www.api-football.com/
2. Sign up for free account (100 requests/day)
3. Get your API key from the dashboard

## Function URLs

### Weather Function
```
GET /.netlify/functions/weather?city=Sydney&country=AU
```

### Football Function  
```
GET /.netlify/functions/football?season=2024
```
