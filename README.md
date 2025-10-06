# Learning Lit Web Components

A simple project to learn Lit without any build process. Components are loaded directly in the browser using ES modules.

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

## Project Structure

```
learning-lit/
├── index.html              # Main demo page
├── components/             # Lit components
│   └── hello-world.js     # First component
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## How It Works

- **No Build Process**: Components are written as ES modules and imported directly
- **CDN Imports**: Lit is loaded from JSDelivr CDN
- **Native Web Components**: Uses the browser's built-in Custom Elements API
- **Live Development**: Just save and refresh to see changes

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

## Learning Resources

- [Lit Documentation](https://lit.dev/)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [Custom Elements Everywhere](https://custom-elements-everywhere.com/)
