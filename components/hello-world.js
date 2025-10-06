// Import Lit from CDN (using Skypack for ES modules)
import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// Define our Hello World component
class HelloWorld extends LitElement {
  // Define component properties
  static properties = {
    name: { type: String }
  };

  // Define component styles
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      border: 2px solid #007acc;
      border-radius: 8px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      margin: 8px 0;
    }

    .greeting {
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .subtitle {
      font-size: 0.9em;
      opacity: 0.8;
    }

    .wave {
      display: inline-block;
      animation: wave 2s infinite;
    }

    @keyframes wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(20deg); }
      75% { transform: rotate(-20deg); }
    }
  `;

  // Constructor to set default values
  constructor() {
    super();
    this.name = 'World';
  }

  // Render method - defines the component's HTML
  render() {
    return html`
      <div class="greeting">
        <span class="wave">👋</span> 
        Hello, ${this.name}!
      </div>
      <div class="subtitle">
        This is a Lit Web Component
      </div>
    `;
  }
}

// Register the component with the browser
customElements.define('hello-world', HelloWorld);
