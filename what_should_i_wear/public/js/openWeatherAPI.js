// let cityName = "toronto";

async function getWeather(cityName) {
  const weather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`;
  let response = await fetch(weather);
  return await response.json();
}
module.exports = { getWeather };
