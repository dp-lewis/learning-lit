// Netlify Function to proxy weather API requests
exports.handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  try {
    const { city, country } = event.queryStringParameters || {};
    
    if (!city) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'City parameter is required' }),
      };
    }

    // Use environment variable for API key
    const API_KEY = process.env.WEATHER_API_KEY;
    
    if (!API_KEY) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Weather API key not configured' }),
      };
    }

    const countryParam = country ? `,${country}` : '';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${countryParam}&appid=${API_KEY}&units=metric`;
    
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: response.ok ? 200 : response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    
  } catch (error) {
    console.error('Weather API Error:', error);
    
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        error: 'Failed to fetch weather data',
        message: error.message 
      }),
    };
  }
};
