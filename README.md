# Learning Lit Web Components

A simple project to learn Lit without any build process. Components are loaded directly in the browser using ES modules.

## 🚀 Live Demo

Visit the live demo: [https://dp-lewis.github.io/learning-lit/](https://dp-lewis.github.io/learning-lit/)

## Getting Started

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

## 📦 Deployment

This project automatically deploys to GitHub Pages using GitHub Actions.

### Manual Deployment Testing

1. **Build the site locally:**
   ```bash
   npm run build
   ```

2. **Preview the built site:**
   ```bash
   npm run preview
   ```

### Automatic Deployment

- **Trigger**: Every push to the `main` branch
- **Target**: GitHub Pages
- **URL**: `https://dp-lewis.github.io/learning-lit/`

The GitHub Action will:
1. Install dependencies
2. Create a clean build
3. Deploy to GitHub Pages
4. Update the live site

## Project Structure

```
learning-lit/
├── index.html                    # Main demo page
├── components/                   # Lit components
│   ├── hello-world.js           # Hello world component
│   ├── weather-component.js     # Weather display component
│   └── premier-league-results.js # Football standings
├── .github/workflows/           # GitHub Actions
│   └── deploy.yml              # Deployment workflow
├── package.json                # Node.js dependencies
└── README.md                   # This file
```

## How It Works

- **No Build Process**: Components are written as ES modules and imported directly
- **CDN Imports**: Lit is loaded from JSDelivr CDN
- **Native Web Components**: Uses the browser's built-in Custom Elements API
- **Live Development**: Just save and refresh to see changes
- **Auto Deployment**: GitHub Actions handles deployment to GitHub Pages

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
- API integration with OpenWeatherMap
- Dynamic city/country properties
- Error handling and loading states
- Responsive design

Usage:
```html
<weather-component city="Sydney" country="AU"></weather-component>
<weather-component city="London" country="GB"></weather-component>
```

### Premier League Standings (`premier-league-standings`)
Football standings component with:
- API-Football integration
- Complete league table display
- Color-coded positions
- Responsive table layout

Usage:
```html
<premier-league-standings></premier-league-standings>
```

## 🔧 Development Workflow

1. **Local Development:**
   ```bash
   npm start
   ```

2. **Make Changes:**
   - Edit components in `components/` folder
   - Update `index.html` for new demos
   - Save and refresh browser

3. **Deploy:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```
   
   GitHub Actions will automatically deploy to GitHub Pages!

## Learning Resources

- [Lit Documentation](https://lit.dev/)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
