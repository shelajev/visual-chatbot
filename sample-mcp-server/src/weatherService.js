import fetch from "node-fetch";

export async function getHourlyForecast(latitude, longitude) {
  return await makeRequest(`https://api.weather.gov/points/${latitude},${longitude}`)
      .then(response => response.json())
      .then(data => makeRequest(data.properties.forecastHourly))
      .then(response => response.json())
      .then(forecast => forecast.properties.periods);
}

export async function getForecast(latitude, longitude) {
  return await makeRequest(`https://api.weather.gov/points/${latitude},${longitude}`)
      .then(response => response.json())
      .then(data => makeRequest(data.properties.forecast))
      .then(response => response.json())
      .then(forecast => forecast.properties.periods);
}

export async function getWarnings(latitude, longitude) {
  const {zones, state} = await makeRequest(`https://api.weather.gov/points/${latitude},${longitude}`)
    .then(response => response.json())
    .then(data => ({ 
      state: data.properties.relativeLocation.properties.state,
      zones: [ data.properties.forecastZone, data.properties.county ]
    }));

  const warnings = await makeRequest(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(response => response.json())
    .then(data => data.features
        .filter(f => f.properties.affectedZones.some(z => zones.includes(z)))
        .map(f => Object.assign({}, f.properties, { geocode: undefined, parameters: undefined, }))
    );

  return warnings;
}

function makeRequest(url) {
  return fetch(url, {
    headers: {
      "Accept": "application/geo+json",
      "User-Agent": "MCP Testing (mikesir87@gmail.com)"
    }
  });
}