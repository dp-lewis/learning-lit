// Import Lit from CDN
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Premier League Standings Component
class PremierLeagueStandings extends LitElement {
  static properties = {
    standings: { type: Array },
    loading: { type: Boolean },
    error: { type: String },
    season: { type: String }
  };

  static styles = css`
    :host {
      display: block;
      padding: 24px;
      background: linear-gradient(135deg, #37003c 0%, #00ff85 100%);
      border-radius: 16px;
      color: white;
      max-width: 600px;
      margin: 16px auto;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    .header {
      text-align: center;
      margin-bottom: 24px;
    }

    .league-title {
      font-size: 1.8em;
      font-weight: bold;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .season-info {
      font-size: 1em;
      opacity: 0.9;
      margin-bottom: 16px;
    }

    .loading {
      text-align: center;
      font-size: 1.2em;
      opacity: 0.8;
      animation: pulse 1.5s infinite;
    }

    .error {
      background: rgba(255, 107, 107, 0.2);
      border: 1px solid rgba(255, 107, 107, 0.5);
      padding: 16px;
      border-radius: 8px;
      margin: 16px 0;
      text-align: center;
    }

    .matches-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .standings-table {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .table-header {
      background: rgba(255, 255, 255, 0.2);
      padding: 12px;
      display: grid;
      grid-template-columns: 40px 1fr 40px 40px 40px 40px 60px;
      gap: 8px;
      font-weight: bold;
      font-size: 0.9em;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .table-row {
      padding: 12px;
      display: grid;
      grid-template-columns: 40px 1fr 40px 40px 40px 40px 60px;
      gap: 8px;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      transition: background 0.3s ease;
    }

    .table-row:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .table-row:last-child {
      border-bottom: none;
    }

    .position {
      font-weight: bold;
      text-align: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9em;
    }

    .position.top4 {
      background: rgba(0, 255, 133, 0.3);
      color: #00ff85;
    }

    .position.europa {
      background: rgba(255, 193, 7, 0.3);
      color: #ffc107;
    }

    .position.relegation {
      background: rgba(255, 107, 107, 0.3);
      color: #ff6b6b;
    }

    .team-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .team-logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9em;
      font-weight: bold;
    }

    .team-name {
      font-weight: 500;
      flex: 1;
    }

    .stat {
      text-align: center;
      font-weight: 500;
    }

    .points {
      font-weight: bold;
      font-size: 1.1em;
    }

    .match-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease, background 0.3s ease;
    }

    .match-card:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.15);
    }

    .match-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 0.9em;
      opacity: 0.8;
    }

    .match-date {
      font-weight: 500;
    }

    .match-status {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.8em;
      font-weight: bold;
    }

    .status-finished {
      background: rgba(0, 255, 133, 0.3);
      color: #00ff85;
    }

    .status-live {
      background: rgba(255, 107, 107, 0.3);
      color: #ff6b6b;
      animation: pulse 2s infinite;
    }

    .status-upcoming {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }

    .match-teams {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 16px 0;
    }

    .team {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }

    .team-name {
      font-weight: bold;
      font-size: 1.1em;
      text-align: center;
      margin-bottom: 4px;
    }

    .team-logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
      margin-bottom: 8px;
    }

    .score-container {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 20px;
    }

    .score {
      font-size: 2em;
      font-weight: bold;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      min-width: 60px;
      text-align: center;
    }

    .vs {
      margin: 0 12px;
      font-size: 1.2em;
      opacity: 0.7;
    }

    .match-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;
      opacity: 0.8;
      margin-top: 12px;
    }

    .refresh-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      cursor: pointer;
      margin: 20px auto 0;
      display: block;
      font-weight: bold;
      transition: all 0.3s ease;
    }

    .refresh-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .no-matches {
      text-align: center;
      opacity: 0.7;
      font-style: italic;
      margin: 20px 0;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 0.5; }
    }

    @media (max-width: 480px) {
      .match-teams {
        flex-direction: column;
        gap: 16px;
      }

      .score-container {
        margin: 12px 0;
      }

      .team-name {
        font-size: 1em;
      }
    }
  `;

  constructor() {
    super();
    this.standings = [];
    this.loading = false;
    this.error = null;
    this.season = '2023'; // Current season
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchStandings();
  }

  async fetchStandings() {
    this.loading = true;
    this.error = null;
    this.standings = [];

    try {
      // Use Netlify function proxy to keep API key secure
      const baseUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:8888/.netlify/functions' // Local Netlify dev
        : '/.netlify/functions'; // Production
      
      const response = await fetch(
        `${baseUrl}/football?season=${this.season}`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          this.error = 'API key invalid. Please check your API-Football key.';
        } else if (response.status === 429) {
          this.error = 'API rate limit exceeded. Please try again later.';
        } else if (response.status === 500 && errorData.error) {
          this.error = errorData.error;
        } else {
          this.error = `Football API unavailable (Error ${response.status}).`;
        }
        return;
      }

      const data = await response.json();
      
      // Log the full response to debug
      console.log('API Response:', data);
      
      if (data.errors && Object.keys(data.errors).length > 0) {
        const errorMessages = Object.values(data.errors);
        this.error = 'API Error: ' + errorMessages.join(', ');
        return;
      }

      // Extract standings from the response
      if (data.response && data.response.length > 0) {
        this.standings = data.response[0].league.standings[0] || [];
      }
      
    } catch (error) {
      console.error('Football API error:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        this.error = 'Network error. Please check your internet connection.';
      } else {
        this.error = 'There was a problem loading the standings. Please try again later.';
      }
    } finally {
      this.loading = false;
    }
  }

  getPositionClass(rank) {
    if (rank <= 4) return 'top4'; // Champions League
    if (rank <= 6) return 'europa'; // Europa League
    if (rank >= 18) return 'relegation'; // Relegation
    return '';
  }

  getTeamInitials(teamName) {
    return teamName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 3)
      .toUpperCase();
  }

  handleRefresh() {
    this.fetchStandings();
  }

  render() {
    return html`
      <div class="header">
        <div class="league-title">
          🏆 Premier League Standings
        </div>
        <div class="season-info">
          Season ${this.season}
        </div>
      </div>

      ${this.loading ? html`
        <div class="loading">
          Loading standings...
        </div>
      ` : ''}

      ${this.error ? html`
        <div class="error">
          ${this.error}
        </div>
      ` : ''}

      ${this.standings.length > 0 && !this.loading ? html`
        <div class="standings-table">
          <div class="table-header">
            <div>Pos</div>
            <div>Team</div>
            <div>MP</div>
            <div>W</div>
            <div>D</div>
            <div>L</div>
            <div>Pts</div>
          </div>
          ${this.standings.map(team => html`
            <div class="table-row">
              <div class="position ${this.getPositionClass(team.rank)}">
                ${team.rank}
              </div>
              <div class="team-info">
                <div class="team-logo">
                  ${this.getTeamInitials(team.team.name)}
                </div>
                <div class="team-name">
                  ${team.team.name}
                </div>
              </div>
              <div class="stat">${team.all.played}</div>
              <div class="stat">${team.all.win}</div>
              <div class="stat">${team.all.draw}</div>
              <div class="stat">${team.all.lose}</div>
              <div class="stat points">${team.points}</div>
            </div>
          `)}
        </div>
      ` : ''}

      ${this.standings.length === 0 && !this.loading && !this.error ? html`
        <div class="no-matches">
          No standings data available.
        </div>
      ` : ''}

      <button class="refresh-btn" @click="${this.handleRefresh}">
        🔄 Refresh Standings
      </button>
    `;
  }
}

// Register the component
customElements.define('premier-league-standings', PremierLeagueStandings);
