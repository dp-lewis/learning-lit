// Import Lit from CDN
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Sydney Weather Component
class WeatherComponent extends LitElement {
  static properties = {
    city: { type: String },
    country: { type: String },
    weather: { type: Object },
    loading: { type: Boolean },
    error: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      padding: 24px;
      background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
      border-radius: 16px;
      color: white;
      text-align: center;
      max-width: 300px;
      margin: 16px auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }

    .location {
      font-size: 1.4em;
      font-weight: bold;
      margin-bottom: 16px;
      opacity: 0.9;
    }

    .weather-main {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin: 20px 0;
    }

    .weather-emoji {
      font-size: 4em;
      animation: bounce 2s infinite;
    }

    .weather-info {
      text-align: left;
    }

    .temperature {
      font-size: 2.5em;
      font-weight: bold;
      margin: 0;
    }

    .description {
      font-size: 1.1em;
      margin: 4px 0;
      text-transform: capitalize;
      opacity: 0.9;
    }

    .loading {
      font-size: 1.2em;
      opacity: 0.8;
      animation: pulse 1.5s infinite;
    }

    .error {
      background: linear-gradient(135deg, #ff7675 0%, #d63031 100%);
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
    }

    .refresh-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      margin-top: 16px;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .last-updated {
      font-size: 0.8em;
      opacity: 0.7;
      margin-top: 12px;
    }

    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.5; }
    }
  `;

  constructor() {
    super();
    this.city = 'Sydney';
    this.country = 'AU';
    this.weather = null;
    this.loading = false;
    this.error = null;
    this.lastUpdated = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchWeather();
  }

  async fetchWeather() {
    this.loading = true;
    this.error = null;
    this.weather = null;
    
    try {
      // Using OpenWeatherMap API (free tier)
      // Note: In production, you'd want to use environment variables for the API key
      const API_KEY = 'ADD_KEY_HERE'; // You'll need to get a free API key from openweathermap.org
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.country}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        if (response.status === 401) {
          this.error = 'API key invalid. Please check your OpenWeatherMap API key.';
        } else if (response.status === 404) {
          this.error = `Weather data not found for ${this.city}.`;
        } else {
          this.error = `Weather service unavailable (Error ${response.status}).`;
        }
        return;
      }
      
      const data = await response.json();
      this.weather = {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        main: data.weather[0].main.toLowerCase()
      };
      this.lastUpdated = new Date().toLocaleTimeString();
      
    } catch (error) {
      console.error('Weather fetch error:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        this.error = 'Network error. Please check your internet connection and try again.';
      } else {
        this.error = 'There was a problem loading the weather data. Please try again later.';
      }
    } finally {
      this.loading = false;
    }
  }

  getWeatherEmoji(weatherMain) {
    switch (weatherMain) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      default:
        return '🌤️';
    }
  }

  getCountryName(countryCode) {
    const countries = {
      'AU': 'Australia',
      'US': 'United States',
      'GB': 'United Kingdom',
      'CA': 'Canada',
      'FR': 'France',
      'DE': 'Germany',
      'JP': 'Japan',
      'CN': 'China',
      'IN': 'India',
      'BR': 'Brazil',
      'IT': 'Italy',
      'ES': 'Spain',
      'RU': 'Russia',
      'KR': 'South Korea',
      'MX': 'Mexico',
      'AR': 'Argentina',
      'ZA': 'South Africa',
      'EG': 'Egypt',
      'NG': 'Nigeria',
      'TH': 'Thailand',
      'VN': 'Vietnam',
      'PH': 'Philippines',
      'MY': 'Malaysia',
      'SG': 'Singapore',
      'ID': 'Indonesia',
      'TR': 'Turkey',
      'GR': 'Greece',
      'PT': 'Portugal',
      'NL': 'Netherlands',
      'BE': 'Belgium',
      'SE': 'Sweden',
      'NO': 'Norway',
      'DK': 'Denmark',
      'FI': 'Finland',
      'CH': 'Switzerland',
      'AT': 'Austria',
      'IE': 'Ireland',
      'NZ': 'New Zealand'
    };
    return countries[countryCode.toUpperCase()] || countryCode;
  }

  handleRefresh() {
    this.fetchWeather();
  }

  render() {
    return html`
      <div class="location">
        🏙️ ${this.city}${this.country ? `, ${this.getCountryName(this.country)}` : ''}
      </div>

      ${this.loading ? html`
        <div class="loading">
          Loading weather data...
        </div>
      ` : ''}

      ${this.error ? html`
        <div class="error">
          ${this.error}
        </div>
      ` : ''}

      ${this.weather && !this.loading ? html`
        <div class="weather-main">
          <div class="weather-emoji">
            ${this.getWeatherEmoji(this.weather.main)}
          </div>
          <div class="weather-info">
            <div class="temperature">
              ${this.weather.temperature}°C
            </div>
            <div class="description">
              ${this.weather.description}
            </div>
          </div>
        </div>

        <button class="refresh-btn" @click="${this.handleRefresh}">
          🔄 Refresh
        </button>

        ${this.lastUpdated ? html`
          <div class="last-updated">
            Last updated: ${this.lastUpdated}
          </div>
        ` : ''}
      ` : ''}
    `;
  }
}

// Register the component
customElements.define('weather-component', WeatherComponent);
