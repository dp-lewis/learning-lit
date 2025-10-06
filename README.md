# Learning Lit Web Components

A simple project to learn Lit without any build process. Components are loaded directly in the browser using ES modules with secure API proxying via Netlify Functions.

## 🚀 Live Demo

Visit the live demo: [https://learnninglit.netlify.app/](https://learnninglit.netlify.app/)

## Getting Started

### Local Development (Simple)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   The server will automatically open `http://localhost:8080`

**Note**: Components will show API errors in this mode since API keys are secured via Netlify Functions.

### Local Development (With API Functions)

For full functionality including working API calls:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Create environment file:**
   ```bash
   # Create .env file in project root
   WEATHER_API_KEY=your_openweathermap_api_key_here
   FOOTBALL_API_KEY=your_api_football_key_here
   ```

3. **Start Netlify dev server:**
   ```bash
   netlify dev
   ```
   
   This runs your site at `http://localhost:8888` with working API functions!

## 📦 Deployment

This project automatically deploys to Netlify with serverless functions for secure API access.

### Automatic Deployment

- **Trigger**: Every push to the `main` branch
- **Platform**: Netlify (with GitHub Actions fallback)
- **URL**: Your Netlify site URL
- **Functions**: Secure API proxying included

### Manual Netlify Setup

1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Set Environment Variables**: Add API keys in Netlify dashboard
3. **Deploy**: Automatic on git push

**Required Environment Variables in Netlify:**
- `WEATHER_API_KEY`: Your OpenWeatherMap API key
- `FOOTBALL_API_KEY`: Your API-Football key

## 🔑 Getting API Keys

### OpenWeatherMap (Free)
1. Go to [openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for free account
3. Get your API key from the dashboard
4. Free tier: 1,000 calls/day

### API-Football (Free)
1. Go to [api-football.com](https://www.api-football.com/)
2. Sign up for free account
3. Get your API key from dashboard  
4. Free tier: 100 requests/day

## Project Structure

```
learning-lit/
├── index.html                     # Main demo page
├── components/                    # Lit components
│   ├── hello-world.js            # Hello world component
│   ├── weather-component.js      # Weather display component
│   └── premier-league-results.js # Football standings
├── netlify/                      # Netlify Functions
│   └── functions/               # Serverless API proxies
│       ├── weather.js          # Weather API proxy
│       └── football.js         # Football API proxy
├── .github/workflows/           # GitHub Actions
│   └── deploy.yml              # Deployment workflow
├── netlify.toml                # Netlify configuration
├── NETLIFY_SETUP.md           # Netlify setup guide
├── package.json               # Node.js dependencies
└── README.md                  # This file
```

## How It Works

- **No Build Process**: Components are written as ES modules and imported directly
- **CDN Imports**: Lit is loaded from JSDelivr CDN
- **Native Web Components**: Uses the browser's built-in Custom Elements API
- **Secure API Access**: Netlify Functions proxy API calls to protect keys
- **Live Development**: Just save and refresh to see changes
- **Auto Deployment**: Netlify handles deployment from GitHub

## 🔒 Security Features

- **API Keys Protected**: Never exposed in client-side code
- **CORS Handling**: Built into Netlify Functions
- **Environment Variables**: Secure server-side storage
- **Error Handling**: User-friendly error messages

## Components

### Hello World (`hello-world`)
A simple component demonstrating:
- Basic Lit component structure
- Properties (reactive `name` attribute)
- CSS styling with animations
- HTML templating

Usage:
```html
<hello-world></hello-world>
<hello-world name="Your Name"></hello-world>
```

### Weather Component (`weather-component`)
A weather display component featuring:
- Secure API integration via Netlify Functions
- Dynamic city/country properties
- Error handling and loading states
- Responsive design with emoji indicators

Usage:
```html
<weather-component city="Sydney" country="AU"></weather-component>
<weather-component city="London" country="GB"></weather-component>
```

### Premier League Standings (`premier-league-standings`)
Football standings component with:
- Secure API-Football integration
- Complete league table display
- Color-coded positions (Champions League, Europa, Relegation)
- Responsive table layout

Usage:
```html
<premier-league-standings></premier-league-standings>
```

## 🔧 Development Workflow

### Quick Development (No APIs)
```bash
npm start
# Edit components, save, refresh browser
```

### Full Development (With APIs)
```bash
# Set up API keys in .env file
netlify dev
# All components work with real data
```

### Deploy
```bash
git add .
git commit -m "Your changes"
git push origin main
# Netlify automatically deploys
```

## 🌐 API Endpoints

Your Netlify Functions create these secure endpoints:

### Weather API
```
GET /.netlify/functions/weather?city=Sydney&country=AU
GET /api/weather?city=London&country=GB
```

### Football API
```
GET /.netlify/functions/football?season=2024
GET /api/football?season=2023
```

## 🐛 Troubleshooting

### Components Show API Errors
- **Local**: Use `netlify dev` instead of `npm start`
- **Production**: Check environment variables in Netlify dashboard

### Functions Not Working
- Verify API keys are set in Netlify environment variables
- Check function logs in Netlify dashboard
- Ensure API keys are valid and have remaining quota

### Local Development Issues
- Install Netlify CLI: `npm install -g netlify-cli`
- Create `.env` file with valid API keys
- Use `netlify dev` for full functionality

## Learning Resources

- [Lit Documentation](https://lit.dev/)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [Secure API Key Management](https://docs.netlify.com/environment-variables/overview/)
