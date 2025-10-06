// Netlify Function to proxy football API requests
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
    const { season } = event.queryStringParameters || {};
    
    // Use environment variable for API key
    const API_KEY = process.env.FOOTBALL_API_KEY;
    
    if (!API_KEY) {
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Football API key not configured' }),
      };
    }

    const currentSeason = season || '2024';
    const LEAGUE_ID = 39; // Premier League ID
    
    const url = `https://v3.football.api-sports.io/standings?league=${LEAGUE_ID}&season=${currentSeason}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    });
    
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
    console.error('Football API Error:', error);
    
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ 
        error: 'Failed to fetch football data',
        message: error.message 
      }),
    };
  }
};
