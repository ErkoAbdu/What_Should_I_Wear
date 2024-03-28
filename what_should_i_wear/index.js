//Import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const openWeather = require("./public/js/openWeatherAPI");
const openAI = require("./public/js/openaiAPI");

//SET UP EXPLRESS APP
const app = express();
const port = process.env.PORT || 1998;

//SET UP FOR EASIER FORM DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SETUP FOR TEMPLATE ENGINE (PUG)
app.set("views", path.join(__dirname, "views")); //set up "views" setting to look in the <__dirname>/views folder
app.set("view engine", "pug"); //set up app to use Pug as template engine

//SETUP FOR PATH TO STATIC FILES
app.use(express.static(path.join(__dirname, "public")));

//SETUP PAGE ROUTES
app.get("/", async (request, response) => {
  response.render("index");
});

//This app.get request gets the cityname from the form then puts it into the paramater for the openweathermap api the cityname and weatherdata is passed to the openai api which is then rendered on the city.pug file
app.get("/city", async (request, response) => {
  let cityName = await request.query.city;
  let currentWeather = await openWeather.getWeather(cityName);
  console.log(currentWeather);
  let aiResponse = await openAI.askAI(cityName, currentWeather);
  console.log(aiResponse);
  response.render("city", { weather: currentWeather, openAI: aiResponse });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
